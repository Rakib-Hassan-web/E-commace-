

const cloudinary = require('cloudinary').v2;



 const uplodecloudinary = async(file,folder)=>{
     const base64Image = file.buffer.toString('base64');
    const dataUrl = `data:${file.mimetype};base64,${base64Image}`;
    return await cloudinary.uploader.upload(dataUrl,{folder})

 } 


 const deletfromCloudinary = async(public_id)=>{
    return await cloudinary.uploader.destroy(public_id)
 }

module.exports ={uplodecloudinary,deletfromCloudinary}