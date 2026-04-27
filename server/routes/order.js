
const express =require('express')
const { checkOut } = require('../Controllers/orderController')
const routee =express.Router()

routee.post('/checkout', checkOut)

module.exports=routee