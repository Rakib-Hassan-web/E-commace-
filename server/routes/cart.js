const express = require('express')
const { AddToCart, getUserCart, updateCart, removeCart } = require('../Controllers/cartController')

const routee =express.Router()



routee.post("/add" ,AddToCart  )
routee.get("/usercart" ,getUserCart  )
routee.put("/update" ,updateCart  )
routee.post("/remove" ,removeCart  )




module.exports = routee