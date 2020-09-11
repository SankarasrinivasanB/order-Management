const router = require("express").Router()
const orderController = require("../controllers/orderController")
const profileController = require("../controllers/profile")
const authController = require("../controllers/authenticationController")

const jwt = require('express-jwt');
const auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
  });

router.get("/getAllOrders",orderController.getAllOrders);

router.get("/getAOrders/:id",orderController.getAOrders);

router.post("/createOrder",orderController.createOrder);

router.put("/updateOrder/:id",orderController.updateOrder);

router.delete("/deleteOrder/:id",orderController.deleteOrder);

router.delete("/deleteAllOrders",orderController.deleteAllOrders);

router.get("/profile/:id",profileController.profileRead);

router.post("/register",authController.register);

router.post("/login",authController.login);

router.post("/forgotPassword",authController.forgotPassword);

router.post("/reset/:token",authController.resetPassword);

module.exports = router 