const orderService = require("../services/orderSevice")
const util = require("../utils/util")()

exports.getAllOrders = async (req,res)=>{
    try {
        const allOrders = await orderService.getAllOrders()
        if(allOrders.length>0){
            util.setSuccess(200,"Retrived all orders",allOrders)
        }else{
            util.setSuccess(200,"No Orders found")
        }
        return util.send(res)
    } catch(err){
        util.setError(400,err)
        return util.send(res)
    }
}

exports.getAOrders = async (req,res) => {
    const {id} = req.params
        
        if(!Number(id)){
            util.setError(404,"Please enter valid numeric value")
            return util.send(res)
        }

    try {
        const aOrders = await orderService.getAOrders(id);
        if(aOrders){
            util.setSuccess(200,"Retrived a order",[aOrders])
        }else{
            util.setError(404,`OrderId ${id} doesnot exist to retrive data`)
        }
        return util.send(res)
    } catch(err) {
        util.setError(400,err)
        return util.send(res)
    }
}

exports.createOrder = async (req,res)=>{
    if(!req.body.productName || !req.body.productId || !req.body.orderQuantity || !req.body.orderPrice){
        util.setError(400,"Please provide complete details")
        return util.send(res)
    }
    orderId = await util.generateSequence("orderId");
    let newOrder = {};
    newOrder = req.body;
    newOrder.orderId = orderId;
    try {
        const createOrder = await orderService.createOrder(newOrder)
        console.log("rcreatepr",createOrder);
        util.setSuccess(200,"order created Successfully",createOrder)
        return util.send(res)
    } catch(err){   
        util.setError(400,err)
        return util.send(res)
    }
}

exports.updateOrder = async (req,res)=>{
    const updateOrderRequest = req.body;
    const { id } = req.params;
    if(!Number(id)){
        util.setError(404,"Please enter valid numeric value")
        return util.send(res)
    }
    try {
        const updateOrder = await orderService.updateOrder(id,updateOrderRequest)
        if(updateOrder){
            util.setSuccess(200,"Order Updated successfully",updateOrder)
        }else{
            util.setError(404,`OrderId ${id} doesnot exists to update`)
        }
        return util.send(res)
    } catch(err) {
        util.setError(400,err)
        return util.send(res)
    }
}

exports.deleteOrder = async (req,res)=> {
    const { id } = req.params;
    if(!Number(id)){
        util.setError(404,"Please enter valid numeric value")
        return util.send(res)
    }
    try {
        const deleteOrder = await orderService.deleteOrder(id)
        if(deleteOrder){
            util.setSuccess(200,"Order deleted successfully",deleteOrder)
        }else{
            util.setError(404,`OrderId ${id} doesnot exists to delete`)
        }
        return util.send(res)
    } catch(err) {
        util.setError(400,err)
        return util.send(res)
    }
}

exports.deleteAllOrders = async (req,res) => {
    try {
        const deleteAllOrders = await orderService.deleteAllOrders()
        util.setSuccess(200,`${deleteAllOrders.deletedCount} orders has been deleted`)
        return util.send(res)
    } catch(err) {
        util.setError(400,err)
        return util.send(res)
    }
}