const orderSchema = require("../models/orderSchema");
const productSchema = require("../models/productSchema");
const userSchema = require("../models/userSchema");
const { sendError, sendSuccess } = require("../services/responseHandler");

const getDashboardOverview = async (req, res) => {
  try {
    const [orderCount, revenueAgg, userCount, productCount] = await Promise.all([
      orderSchema.countDocuments(),
      orderSchema.aggregate([{ $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } }]),
      userSchema.countDocuments(),
      productSchema.countDocuments(),
    ]);

    const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

    const recentOrders = await orderSchema
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "fullName email")
      .lean();

    const formattedOrders = recentOrders.map((order) => ({
      id: order.OrderNum || order._id,
      customer: order.user?.fullName || "Unknown Customer",
      date: new Date(order.createdAt).toLocaleDateString("en-GB"),
      total: `৳${Number(order.totalPrice || 0).toLocaleString()}`,
      status: order.orderStatus || "PROCESSING",
    }));

    return sendSuccess(
      res,
      "Dashboard overview fetched successfully",
      {
        metrics: [
          { id: 1, title: "Total Orders", value: orderCount, color: "bg-indigo-500" },
          { id: 2, title: "Revenue", value: `৳${totalRevenue.toLocaleString()}`, color: "bg-green-500" },
          { id: 3, title: "Users", value: userCount, color: "bg-yellow-500" },
          { id: 4, title: "Products", value: productCount, color: "bg-pink-500" },
        ],
        recentOrders: formattedOrders,
      },
      200
    );
  } catch (error) {
    console.error("Dashboard overview error:", error);
    return sendError(res, "Failed to load dashboard data", 500, error);
  }
};

module.exports = { getDashboardOverview };
