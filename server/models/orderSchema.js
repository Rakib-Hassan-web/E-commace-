const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  
   sku: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min:1,
    default:1,
  },
 subtotal: {
    type: Number,
    required: true,
  },
});

const shippingAddressSchema = new mongoose.Schema({

    fullName: {
    type: String,
    required: true,
  },
    phone: {
    type: String,
    required: true,
  },
    address: {
    type: String,
    required: true,
  },
 
});


const paymentschema = new mongoose.Schema({

    paymentMethod: {
      type: String,
      enum: ["COD", "BKASH", "NAGAD", "CARD"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },
 
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [orderItemSchema],

    shippingAddress: shippingAddressSchema,

    deliveryCost:{
        type:Number,
        default:0
    },

       totalPrice: {
      type: Number,
      required: true,
    },

 payment:paymentschema,

    orderStatus: {
      type: String,
      enum: ["PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PROCESSING",
    },

    OrderNum: {
      type: String,
      unique: true,
    },

 
    paidAt: Date,
    deliveredAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);