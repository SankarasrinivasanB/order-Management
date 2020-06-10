module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            orderId : Number,
            productName : String,
            productId : Number,
            orderQuantity : Number,
            orderPrice : Number
        },
        {
            timestamps : true
        }
    );
    
const orders = mongoose.model("order",schema);
return orders;
}
