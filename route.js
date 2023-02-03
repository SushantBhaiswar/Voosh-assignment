const express = require("express")
const { addorder, getorder } = require("./controller/ordercontroller")
const { Register, Login, gettoken, logout } = require("./controller/usercontroller")
const { authenticate } = require("./middleware/middleware")
const Router = express.Router()


Router.post("/register", Register)
Router.post("/login", Login)
Router.post("/gettoken", authenticate, gettoken)

Router.post("/add-order", authenticate, addorder)
Router.get("/get-order/:id", authenticate, getorder)
Router.post("/logout", authenticate, logout)
module.exports = Router