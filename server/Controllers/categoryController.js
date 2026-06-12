const categorySchema = require("../models/categorySchema")
const { uplodecloudinary } = require("../services/cloudinaryServices")
const { sendSuccess, sendError } = require("../services/responseHandler")

const isValidImageFile = (file) => {
    if (!file) return false;
    return Boolean(file.buffer?.length) && /^image\//.test(file.mimetype || "");
};

const createNewCategory = async(req,res)=>{
    try {
        const name = (req.body.name || "").trim();
        const description = (req.body.description || "").trim();
        const slug = (req.body.slug || name).toLowerCase().trim().replace(/\s+/g, "-");

        if (!name) return sendError(res, "Category name is required", 400);
        if (!slug) return sendError(res, "Slug is required", 400);
        if (!isValidImageFile(req.file)) return sendError(res, "Please upload a valid image file (jpg, png, webp).", 400);

        const existingCategoryslug = await categorySchema.findOne({ slug });
        if (existingCategoryslug) return sendError(res, "Category already exists", 400);

        let response;
        try {
            response = await uplodecloudinary(req.file, "thumbnail");
        } catch (uploadError) {
            console.error("Category image upload failed", uploadError);
            return sendError(res, "Image upload failed. Please use a valid image file.", 400);
        }

        const category = new categorySchema({
            name,
            description,
            slug,
            thumbnail: response?.secure_url,
        });

        await category.save();
        return sendSuccess(res, "Category created successfully", category, 201);
    } catch (error) {
        console.error("Create category error:", error);
        return sendError(res, "Server error", 500);
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const name = (req.body.name || "").trim();
        const description = (req.body.description || "").trim();
        const slug = (req.body.slug || "").trim().toLowerCase().replace(/\s+/g, "-");
        const { isActive } = req.body;

        const existingCategory = await categorySchema.findById(id);
        if (!existingCategory) return sendError(res, "Category not found", 404);

        if (slug && slug !== existingCategory.slug) {
            const slugExists = await categorySchema.findOne({ slug });
            if (slugExists) return sendError(res, "Category slug already exists", 400);
        }

        if (name) existingCategory.name = name;
        if (description !== undefined) existingCategory.description = description;
        if (slug) existingCategory.slug = slug;
        if (isActive !== undefined) existingCategory.isActive = isActive === true || isActive === "true";

        if (req.file) {
            if (!isValidImageFile(req.file)) {
                return sendError(res, "Please upload a valid image file (jpg, png, webp).", 400);
            }
            try {
                const response = await uplodecloudinary(req.file, "thumbnail");
                existingCategory.thumbnail = response?.secure_url;
            } catch (uploadError) {
                console.error("Update category image upload failed", uploadError);
                return sendError(res, "Image upload failed. Please use a valid image file.", 400);
            }
        }

        await existingCategory.save();
        return sendSuccess(res, "Category updated successfully", existingCategory, 200);
    } catch (error) {
        console.error("Update category error:", error);
        return sendError(res, "Server error", 500);
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await categorySchema.findByIdAndDelete(id);

        if (!deletedCategory) return sendError(res, "Category not found", 404);

        sendSuccess(res, "Category deleted successfully", null, 200);
    } catch (error) {
        console.error("Delete category error:", error);
        sendError(res, "Server error", 500);
    }
};

module.exports={createNewCategory, updateCategory, deleteCategory}