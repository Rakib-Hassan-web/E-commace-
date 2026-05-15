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
// Allow requests from the client app(s). Use env or allow common dev ports.
const allowedClientOrigins = [


app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like Postman or curl
      if (!origin) return callback(null, true);
      if (allowedClientOrigins.indexOf(origin) !== -1) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
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