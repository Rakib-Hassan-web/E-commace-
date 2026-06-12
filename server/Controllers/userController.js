const userSchema = require("../models/userSchema");
const { sendError, sendSuccess } = require("../services/responseHandler");

// GET /user/all - admin-only
const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const skip = (page - 1) * limit;

    const filter = {};

    const totalUsers = await userSchema.countDocuments(filter);
    const users = await userSchema
      .find(filter)
      .select("-password -otp -otpExpires -resetExpire -resetPassToken")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalPages = Math.ceil(totalUsers / limit) || 0;

    return sendSuccess(res, "Users fetched", {
      users,
      pagination: { totalUsers, page, limit, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1 },
    }, 200);
  } catch (error) {
    console.error("getAllUsers error:", error);
    return sendError(res, "Server error", 500, error);
  }
};

module.exports = { getAllUsers };
