const mongoose = require("mongoose");
const categorySchema = require("../models/categorySchema");
const productSchema = require("../models/productSchema");
const { uplodecloudinary, deletfromCloudinary } = require("../services/cloudinaryServices");
const { sendError, sendSuccess } = require("../services/responseHandler");
const ENUM_SIZE = ["s", "m", "l", "xl", "2xl", "3xl"];

// ---------create new product------------------
const createNewProduct = async (req, res) => {
  try {
    const { title, slug, description, category, price, discountPercentage, variants, tags } = req.body;
    const thumbnail = req.files?.thumbnail;
    const images = req.files?.images;

    // basic validations
    if (!title) return sendError(res, "title is Required", 400);
    if (!slug) return sendError(res, "slug is Required", 400);
    const ExistingSlug = await productSchema.findOne({ slug: slug.toLowerCase().trim() });
    if (ExistingSlug) return sendError(res, "slug already exists", 400);
    if (!description) return sendError(res, "description is Required", 400);
    if (!category) return sendError(res, "category is Required", 400);
    const ExistingCategory = await categorySchema.findById(category);
    if (!ExistingCategory) return sendError(res, "Invalid category", 400);
    if (!price) return sendError(res, "price is Required", 400);

    // normalize variants (may come as JSON string in form-data)
    const variantData = variants && typeof variants === "string" ? JSON.parse(variants) : variants;
    if (!Array.isArray(variantData) || variantData.length === 0)
      return sendError(res, "Minimum 1 variant is required.", 400);

    for (const element of variantData) {
      if (!element.sku) return sendError(res, "Each variant must have a SKU.", 400);
      if (!element.color) return sendError(res, "Each variant must have a color.", 400);
      if (!element.size) return sendError(res, "Each variant must have a size.", 400);
      if (!ENUM_SIZE.includes(element.size)) return sendError(res, "Invalid size.", 400);
      if (!element.stock || element.stock < 1) return sendError(res, "Each variant must have a valid stock value.", 400);

      const ALL_Sku = variantData.map((v) => v.sku);
      if (new Set(ALL_Sku).size !== ALL_Sku.length) return sendError(res, "Duplicate SKU found.", 400);
    }

    // thumbnail validation and upload
    if (!thumbnail || thumbnail.length === 0) return sendError(res, "Thumbnail is Required", 400);
    if (images && images.length > 4) return sendError(res, "You can upload images max 4", 400);

    const thumbnailResp = await uplodecloudinary(thumbnail[0], "products");
    if (!thumbnailResp) return sendError(res, "Failed to upload thumbnail", 400);

    // images upload
    let imagesUrl = [];
    if (images) {
      const resPromise = images.map(async (item) => uplodecloudinary(item, "products"));
      const results = await Promise.all(resPromise);
      imagesUrl = results.map((r) => r.secure_url);
    }

    // save to database
    const formattedSlug = slug.toLowerCase().trim();
    const newProduct = new productSchema({
      title,
      slug: formattedSlug,
      description,
      category,
      price,
      discountPercentage,
      variants: variantData,
      tags,
      thumbnail: thumbnailResp.secure_url,
      images: imagesUrl,
    });

    await newProduct.save();
    return sendSuccess(res, "Product created successfully", newProduct, 201);
  } catch (error) {
    console.log(error);
    return sendError(res, "Internal Server Error", 500);
  }
};

// ---------get all products -------------
const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const category = req.query.category;

    const filter = { isActive: true };
    if (category) {
      // try to resolve category by name, slug or id
      let catDoc = await categorySchema.findOne({ name: category });
      if (!catDoc) catDoc = await categorySchema.findOne({ slug: category });
      if (!catDoc && mongoose.Types.ObjectId.isValid(category)) catDoc = await categorySchema.findById(category);

      if (catDoc) filter.category = catDoc._id;
      else
        return sendSuccess(res, "All products", {
          product: [],
          pagination: {
            totalProducts: 0,
            page,
            limit,
            totalPages: 0,
            hasNextPage: false,
            hasPrevPage: false,
          },
        }, 200);
    }

    const totalProducts = await productSchema.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit) || 0;

    const products = await productSchema
      .find(filter)
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return sendSuccess(res, "All products", {
      product: products,
      pagination: {
        totalProducts,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    }, 200);
  } catch (error) {
    console.error("getAllProducts error:", error);
    return sendError(res, "server error", 500, error);
  }
};

// -------- get single product details----------
const singleProductDetails = async (req, res) => {
  try {
    const { slug } = req.params;

    const ProductDetails = await productSchema
      .findOne({ slug, isActive: true })
      .populate("category", "name")
      .select("-__v")
      .lean();

    if (!ProductDetails) return sendError(res, "404 Not found", 404);

    return sendSuccess(res, "Details", ProductDetails, 200);
  } catch (error) {
    console.error("singleProductDetails error:", error);
    return sendError(res, "Internal server Error", 500);
  }
};

// -----------update product-----------
const updateProduct = async (req, res) => {
  try {
    const { title, description, category, price, discountPercentage, variants, tags, isActive, destroyImg = [] } = req.body;
    const { slug } = req.params;
    const thumbnail = req.files?.thumbnail;
    const images = req.files?.images;

    const productData = await productSchema.findOne({ slug });
    if (!productData) return sendError(res, "Product not found", 404);

    if (title) productData.title = title;
    if (description) productData.description = description;
    if (category) productData.category = category;
    if (price) productData.price = price;
    if (discountPercentage) productData.discountPercentage = discountPercentage;
    if (tags && tags.length > 0 && Array.isArray(tags)) productData.tags = tags;
    if (isActive) productData.isActive = isActive === "true";

    // variants validation
    const varientdata = variants && JSON.parse(variants);
    if (Array.isArray(varientdata) && varientdata.length > 0) {
      for (const element of varientdata) {
        if (!element.sku) return sendError(res, "Each variant must have a SKU.", 400);
        if (!element.color) return sendError(res, "Each variant must have a color.", 400);
        if (!element.size) return sendError(res, "Each variant must have a size.", 400);
        if (!ENUM_SIZE.includes(element.size)) return sendError(res, "Invalid size.", 400);
        if (!element.stock || element.stock < 1) return sendError(res, "Each variant must have a valid stock value.", 400);

        const ALL_Sku = varientdata.map((v) => v.sku);
        if (new Set(ALL_Sku).size !== ALL_Sku.length) return sendError(res, "Duplicate SKU found.", 400);
      }

      productData.variants = varientdata;
    }

    // thumbnail update
    if (thumbnail) {
      const imgPublicId = productData.thumbnail.split("/").pop().split(".")[0];
      deletfromCloudinary(`products/${imgPublicId}`);
      const response = await uplodecloudinary(thumbnail, "products");
      productData.thumbnail = response.secure_url;
    }

    // images handling
    let imagesUrl = [];
    let totalImges = Array.isArray(productData.images) ? productData.images.length : 0;
    if (destroyImg.length > 0) totalImges -= destroyImg.length;
    if (Array.isArray(images) && images.length > 0) totalImges += images.length;

    if (totalImges > 4) return sendError(res, "You can upload maximum 4 images", 400);
    if (totalImges < 1) return sendError(res, "Minimum upload 1 image", 400);

    if (images) {
      const resPromise = images.map(async (item) => uplodecloudinary(item, "products"));
      const results = await Promise.all(resPromise);
      imagesUrl = results.map((r) => r.secure_url);
    }

    if (Array.isArray(destroyImg) && destroyImg.length > 0) {
      for (const url of destroyImg) {
        const imgPublicId = url.split("/").pop().split(".")[0];
        deletfromCloudinary(`products/${imgPublicId}`);
      }
    }

    let filterImg = Array.isArray(productData.images) ? productData.images.filter((item) => !destroyImg.includes(item)) : [];

    imagesUrl = imagesUrl.concat(filterImg);

    if (imagesUrl.length > 0) productData.images = imagesUrl;
    await productData.save();

    return sendSuccess(res, "Product updated", productData, 200);
  } catch (error) {
    console.error("updateProduct error:", error);
    return sendError(res, "server error", 500);
  }
};

module.exports = { createNewProduct, getAllProducts, singleProductDetails, updateProduct };
