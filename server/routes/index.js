

const express =require('express')

const routee =express.Router()

const auth_route = require ('./auth.js')
const product_route = require ('./product.js')
const category_route = require ('./category.js')
const cart_route = require ('./cart.js')
const order_route = require ('./order.js')
const authMiddleware = require('../middleware/authMiddleware.js')



routee.use('/auth' ,  auth_route)

routee.use('/product' ,  product_route)
routee.use('/category' , category_route)
routee.use('/cart' ,authMiddleware,  cart_route)
routee.use('/order' ,authMiddleware,  order_route)



routee.get ('/' ,(req,res)=>{
    res.send ('api is working')
})

module.exports=routee