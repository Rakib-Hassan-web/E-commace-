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

       category.save()
       sendSuccess(res, " Category created successfully", 201); 


    } catch (error) {
         sendError(res, "Server error", 500);
    }
}


module.exports={createNewCategory}