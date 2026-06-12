const categorySchema = require("../models/categorySchema")
const { uplodecloudinary } = require("../services/cloudinaryServices")
const { sendSuccess, sendError } = require("../services/responseHandler")


const createNewCategory = async(req,res)=>{
    try {
        const {name ,description,slug} = req.body


        if(!name) return  sendError(res , " Category name is required" ,400)
        if(!slug) return  sendError(res , " slug is required" ,400)
        if(!req.file) return  sendError(res , "Category thumbnail is required" ,400)


        const existingCategoryslug = await categorySchema.findOne({slug})
        if(existingCategoryslug)  return sendError(res, "Category already exists", 400); 


     const response =await uplodecloudinary(req.file ,"thumbnail")

       const  category = new categorySchema({
        name,
        description,
        slug,
        thumbnail:response.secure_url
       })

       await category.save()
       sendSuccess(res, "Category created successfully", category, 201); 


    } catch (error) {
         sendError(res, "Server error", 500);
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, slug, isActive } = req.body;

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
            const response = await uplodecloudinary(req.file, "thumbnail");
            existingCategory.thumbnail = response.secure_url;
        }

        await existingCategory.save();
        sendSuccess(res, "Category updated successfully", existingCategory, 200);
    } catch (error) {
        console.error("Update category error:", error);
        sendError(res, "Server error", 500);
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