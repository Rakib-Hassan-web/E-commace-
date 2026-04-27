const mongoose =require("mongoose")


const CategorySchema = new mongoose.Schema({

  name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
      slug: {
        type: String,
        required: true,
        unique: true,
        
    },
    thumbnail: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    }

})

module.exports = mongoose.model("Category" ,CategorySchema)