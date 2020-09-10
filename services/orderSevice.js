const database = require("../models")
const order = database.orders;
const sequenceGenerator = database.sequenceGenerator;

exports.getAllOrders = async () => {
    try {
        return await order.find();
    } catch(err) {
        throw err;
    }
}

exports.getAOrders = async (id) => {
    const checkOrderId = await order.findOne({"orderId":id});
    try {
        if(checkOrderId){
            return await order.findOne({"orderId":id})
        }
        return null
    } catch(err) {
        throw err;
    }
}

exports.createOrder = async (newOrder) => {
    try {
        console.log("neworder service-",newOrder)
        return await order.create(newOrder);
    } catch(err){
        throw err;
    }

};

exports.updateOrder = async (id,updateRequest) => {
    const checkOrderId = await order.findOne({"orderId":id});
    try {
        if(checkOrderId){
            await order.updateOne({"orderId":id},updateRequest);
            return updateRequest;
        }
        return null
    } catch(err){
        throw err;
    }
}

exports.deleteOrder = async (id) => {
    const checkOrderId = await order.findOne({"orderId":id});
    try {
        if(checkOrderId){
            const deletedOrder = await order.deleteOne({"orderId":id});
            return deletedOrder;
        }
        return null
    } catch(err){
        throw err;
    }
}

exports.deleteAllOrders = async () => {
    try {
        const deleteAllOrders = await order.deleteMany({});
        return deleteAllOrders;
    } catch(err) {
        throw err;
    }
}

exports.getSequence = async (sqnName) => {
    try {
       let sequenceCreator = await sequenceGenerator.findOneAndUpdate(
            {sequenceName:sqnName},
            {$inc:{sequenceValue:1}},
            {
                upsert:true,
                new:true
            }
        );
        return sequenceCreator;
    } catch(err) {
        throw err;
    }
}