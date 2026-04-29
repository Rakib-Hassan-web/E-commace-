require('dotenv').config()
const express = require('express')
const DATABASE_URL = require('./dB config')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const routee = require('./routes')
const cloudinaryConfig = require('./services/cloudinaryConfig')
const { webhook } = require('./Controllers/orderController')

const app = express()

// ------------ Webhook ---------------
app.post("/webhook", express.raw({ type: "application/json" }), webhook)

// ------------ middlewares----------------
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// Enable CORS for development and allow credentials (cookies)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//------------- DB config---------
DATABASE_URL()
cloudinaryConfig()

// ---------------routes--------------
app.use(routee)

app.listen(8000, () => {
  console.log("Server is running on port 8000")
})