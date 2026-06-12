

const express =require('express')

const routee =express.Router()

const auth_route = require ('./auth.js')
const product_route = require ('./product.js')
const category_route = require ('./category.js')
const cart_route = require ('./cart.js')
const order_route = require ('./order.js')
const user_route = require('./user.js')
const authMiddleware = require('../middleware/authMiddleware.js')
const dashboardController = require('../Controllers/dashboardController.js')



routee.use('/auth' ,  auth_route)

routee.use('/product' ,  product_route)
routee.use('/category' , category_route)
routee.use('/user' , user_route)
routee.use('/cart' ,authMiddleware,  cart_route)
routee.use('/order' ,authMiddleware,  order_route)
routee.get('/dashboard/overview', authMiddleware, dashboardController.getDashboardOverview)

routee.get ('/' ,(req,res)=>{
    res.send ('api is working')
})

module.exports=routee