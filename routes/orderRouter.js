const router = require("express").Router()
const orderController = require("../controllers/orderController")

router.get("/",orderController.getAllOrders);

router.get("/:id",orderController.getAOrders);

router.post("/",orderController.createOrder);

router.put("/:id",orderController.updateOrder);

router.delete("/:id",orderController.deleteOrder);

router.delete("/",orderController.deleteAllOrders);

module.exports = router 