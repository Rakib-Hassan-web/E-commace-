const categorySchema = require("../models/categorySchema");
const productSchema = require("../models/productSchema");
const { uplodecloudinary, deletfromCloudinary } = require("../services/cloudinaryServices");
const { sendError, sendSuccess } = require("../services/responseHandler");
const ENUM_SIZE = ["s", "m", "l", "xl", "2xl", "3xl"];

// ---------create new product------------------

const createNewProduct = async (req,res)=>{
    try {
        const {title,slug,description,category,price,discountPercentage,variants,tags} = req.body;
         const thumbnail =req.files?.thumbnail
         const images =req.files?.images

        //  ------------- basic validations------------
         if (!title) return sendError(res, "title is Required", 400);
         if (!slug) return sendError(res, "slug is Required", 400);
         const ExistingSlug = await productSchema.findOne({ slug:slug.toLowerCase().trim()})
         if (ExistingSlug) return sendError(res, "slug already exists", 400);
         if (!description) return sendError(res, "description is Required", 400);
         if (!category) return sendError(res, "category is Required", 400);
         const ExistingCategory = await categorySchema.findById(category);
         if (!ExistingCategory) return sendError(res, "Invalid category", 400);
         if (!price) return sendError(res, "price is Required", 400);
        
// ------------------variants validatoin-------------------

       const varientdata = JSON.parse(variants)
       if (!Array.isArray(varientdata) || varientdata.length === 0) return  sendError(res, "Minimum 1 variant is required.", 400); 
       for (const element of varientdata) {
        
        if(!element.sku) return sendError(res, "Each variant must have a SKU.", 400);
        if(!element.color) return sendError(res, "Each variant must have a color.", 400);
        if(!element.size) return sendError(res, "Each variant must have a size.", 400);
        if(!ENUM_SIZE.includes(element.size)) return sendError(res, "Invalid size.", 400);
        if(!element.stock || element.stock < 1) return sendError(res, "Each variant must have a valid stock value.", 400);
        
        const ALL_Sku = varientdata.map(v=>v.sku)
        if( new Set(ALL_Sku).size !== ALL_Sku.length) return sendError(res, "Duplicate SKU found.", 400);
        
      }

// -----------------thumbnail validation----------------

  if (!thumbnail || thumbnail?.length === 0) return sendError(res, "Thumbnail is Required", 400);
         if (images && images?.length > 4) return sendError(res, "You can upload images max 4", 400);
         const thumnailUrl = await uplodecloudinary(thumbnail[0], "products")

        if (!thumnailUrl) return sendError(res, "Failed to upload thumbnail", 400);

// -------------images validation------------

        let imagesUrl = [];

        if (images) {
            const resPromise = images.map(async (item) => uplodecloudinary(item, "products"));
            const results = await Promise.all(resPromise)
            imagesUrl = results.map(r => r.secure_url)

          }

    // ---------save to databsse--------
    const formattedSlug = slug.toLowerCase().trim();
      const newProduct = new productSchema({
        title,
        slug :formattedSlug,
        description,
        category,price,
        discountPercentage,
        variants: varientdata,
        tags,
        thumbnail: thumnailUrl.secure_url,
        images: imagesUrl
      })
      await newProduct.save()
      sendSuccess(res, "Product created successfully", newProduct, 201)
    } catch (error) {
      console.log(error);
      
  sendError(res, "Internal Server Error", 500)
    }
}


// ---------get all  products -------------

const getAllProducts = async( req,res)=>{
  try {

const page = parseInt(req.query.page) || 1; 
const limit = parseInt(req.query.limit) || 10; 
const skip = (page - 1) * limit;
const category = req.query.category


    const pipeline = [
      {  $match: { "isActive": true, },},
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category"  },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]


  
  const totalProducts = await productSchema.countDocuments();
  const totalPages = Math.ceil(totalProducts / limit);
    if (category) { pipeline.push({  $match: { "category.name": category, },});
    }
  const products = await productSchema.aggregate(pipeline)
     

     sendSuccess(res, "All products" ,{
      product:products,
      pagination:{
        totalProducts,
        page,
        limit,
        totalPages,
        hasNextPage:page <totalPages,
        hasPrevPage:page>1  
      }

     } ,200)
    
  } catch (error) {
   
   sendError(res,"server error" ,500 ,error)
  }
}

// -------- get single product  details----------




const singleProductDetails = async(req,res)=>{

try {
    const {slug} = req.params

  const ProductDetails = await productSchema.findOne({slug , isActive:true})
  .populate("category" ,"name")
  .select("-__v")

  if(!ProductDetails) sendError(res ,"404 Not found" ,404)

   sendSuccess(res ,"Details",ProductDetails ,200 )
  
} catch (error) {
   sendError(res ,"Internal server Error" ,500)
}

}


// -----------update produt-----------

const updateProduct = async (req, res) => {

    try {
        const { title, description, category, price, discountPercentage, variants, tags, isActive ,destroyImg =[]} = req.body;
      const { slug } = req.params;
      const thumbnail =req.files?.thumbnail
      const images =req.files?.images

   

    const productData = await productSchema.findOne({slug})
    

    if(title) productData.title =title
    if(description) productData.description =description
    if(category) productData.category =category
    if(price) productData.price =price
    if(discountPercentage) productData.discountPercentage =discountPercentage
    if(tags && tags?.length>0 && Array.isArray(tags)) productData.tags =tags
    if(isActive) productData.isActive = isActive ==="true"

       
  // ------------------variants validatoin-------------------

  const varientdata =variants && JSON.parse(variants)
      if(Array.isArray(varientdata) && varientdata.length > 0){
        for (const element of varientdata) {
        
        if(!element.sku) return sendError(res, "Each variant must have a SKU.", 400);
        if(!element.color) return sendError(res, "Each variant must have a color.", 400);
        if(!element.size) return sendError(res, "Each variant must have a size.", 400);
        if(!ENUM_SIZE.includes(element.size)) return sendError(res, "Invalid size.", 400);
        if(!element.stock || element.stock < 1) return sendError(res, "Each variant must have a valid stock value.", 400);
        
        const ALL_Sku = varientdata.map(v=>v.sku)
        if( new Set(ALL_Sku).size !== ALL_Sku.length) return sendError(res, "Duplicate SKU found.", 400);
        
      }

       
        productData.variants =varientdata
        
      }

       // ----------thumnail--
            if(thumbnail){
              const imgPublicId = productData.thumbnail.split("/").pop().split(".")[0];
               deletfromCloudinary(`products/${imgPublicId}`);
               const response =await uplodecloudinary(thumbnail ,"products")
     
               productData.thumbnail =response.secure_url;
             }

            //  -images-----

             let imagesUrl = [];
               let totalImges = productData.images.length;
                 if (destroyImg.length > 0) totalImges -= destroyImg.length;
                 if (Array.isArray(images) && images.length > 0) totalImges += images.length;
    
                      if (totalImges > 4) return sendError(res,  "You can upload maximum 4 images" ,400);
                      if (totalImges < 1) return sendError(res,  "Minimum uplode 1 image",400);

              if (images) {
              const resPromise = images.map(async (item) => uplodecloudinary(item, "products"));
              const results = await Promise.all(resPromise)
              imagesUrl = results.map(r => r.secure_url)

              }

            //  console.log(Array.isArray(destroyImg));
             
            
              
             if(Array.isArray(destroyImg) && destroyImg.length > 0){
              for (const url of destroyImg) {
                      const imgPublicId = url.split("/").pop().split(".")[0];
                  deletfromCloudinary(`products/${imgPublicId}`);
              }
               }

              let filterImg =productData.images.filter((item)=>{
                return !destroyImg.includes(item)
              })

             imagesUrl= imagesUrl.concat(filterImg)
            
      
             if(imagesUrl.length > 0) productData.images = imagesUrl
             productData.save()


             sendSuccess(res ,"Product updated",productData,200,)
     } catch (error) {
       
             sendError(res ,"server error",500,)
       
    }
      }

    
 


module.exports ={createNewProduct,getAllProducts,singleProductDetails,updateProduct}