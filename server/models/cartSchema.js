const mongoose = require("mongoose")

const cartItems = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true
    },
    sku:{
        type:String,
        required:true
    },
    Quantity:{
        type:Number,
        required:true,
        min:1,
        default:1
    },
    subtotal:{
        type:Number,
        required:true
        
    }
})

const CartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },
    items:[cartItems],   
    totalproducts:{
        type:Number,
        default:0
    },
    totalprice:{
        type:Number,
        default:0 
    }
},{timestamps:true})

module.exports = mongoose.model("cart", CartSchema)