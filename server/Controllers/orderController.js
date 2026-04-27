const cartSchema = require("../models/cartSchema");
const orderSchema = require("../models/orderSchema");
const Order = require("../models/orderSchema");
const { sendError, sendSuccess } = require("../services/responseHandler");
const stripe = require('stripe')(process.env.STRIPE_SEC);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;



// --------------ckeckout-----------------------
const checkOut = async (req, res) => {
  try {
    const { cartID, shippingAddress, paymentMethod } = req.body;
    const OrderNum = `RHA-${Date.now()}`;

    // ------------- Validation----------
    if (!cartID) return sendError(res, "cartid is required", 400);
    if (!shippingAddress) return sendError(res, "shipping address is required", 400);
    if (!paymentMethod) return sendError(res, "payment information is required", 400);

 
    const cartData = await cartSchema
      .findById(cartID)
      .populate("items.product");

    if (!cartData) return sendError(res, "cart not found", 404);


    const validItems = cartData.items.filter((item) => item.product);

    if (validItems.length === 0) {
      return sendError(res, "No valid products in cart", 400);
    }

    // ------ Total price------ 
    const totalPrice = validItems.reduce((total, item) => {
      return total + (item.subtotal || 0);
    }, 0);

    // --------- Create Order-----------
    const orderData = new Order({
      user: req.user._id,
      orderItems: validItems,

      shippingAddress: {
        fullName: shippingAddress.fullName,
        address: shippingAddress.address,
        phone: shippingAddress.phone,
      },

      paymentMethod,
      totalPrice,
      OrderNum,
      deliveryCost: 120,
    });

    await orderData.save();


    if (paymentMethod === "COD") {
      await cartSchema.findByIdAndDelete(cartID);
      return sendSuccess(res, "order placed successfully", 200);
    }

    const line_items = validItems.map((item) => {
      const product = item.product;

      const productName =
        product?.name || product?.title || "Product";

      const shortDesc = product?.description
        ? product.description.split(" ").slice(0, 8).join(" ") + "..."
        : "No description";

      const price = product?.price || 100;

      return {
        price_data: {
          currency: "bdt",
          product_data: {
            name: productName,
            description: shortDesc,
          },
          unit_amount: price * 100,
        },
        quantity: item.Quantity || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,

      customer_email: req.user.email,

      success_url: `https://example.com/success`,
      cancel_url: `https://example.com/error`,

      metadata: {
        orderId: orderData._id.toString(),
      },
    });

    await cartSchema.findByIdAndDelete(cartID);

    console.log(session);
    return res.redirect(303, session.url);

    

  } catch (error) {
    console.log("Checkout Error:", error);
    return sendError(res, "internal server error", 500);
  }
};

// --------------weebhook-------------------

const webhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      endpointSecret
    );
  } catch (err) {
    return sendError(res, `Webhook Error: ${err.message}`, 400);
  }

  const session = event.data.object;

  try {
    
    if (!session.metadata?.orderId) {
      return sendError(res, "No orderId found", 400);
    }

    const orderId = session.metadata.orderId;

    if (event.type === "checkout.session.completed") {
      await Order.findByIdAndUpdate(orderId, {
        "payment.status": "paid",
      });
    }

   
    else if (event.type === "checkout.session.async_payment_failed") {
      await Order.findByIdAndUpdate(orderId, {
        "payment.status": "failed",
      });
    }

   
    else if (event.type === "checkout.session.expired") {
      await Order.findByIdAndUpdate(orderId, {
        "payment.status": "failed",
      });
    }

  } catch (error) {
    return sendError(res, `Webhook Error: ${error.message}`, 400);
  }

  console.log("event received:", event.type);

  return sendSuccess(res, "webhook received", 200);
};


module.exports = { checkOut ,webhook};