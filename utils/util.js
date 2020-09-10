
const orderService = require("../services/orderSevice")
const utils = {
   
    setSuccess(statusCode,message,data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.type = "success"
    },

    setError(statusCode,message){
        this.statusCode = statusCode;
        this.message = message;
        this.type = "error"
    },

    send(res){
        const result = this.data;
    
        if(this.type === "success"){
            return res.status(this.statusCode).json({
                statusCode: this.statusCode,
                message : this.message,
                data : this.data,
        
            });
        }
    
        return res.status(this.statusCode).json({
            status: this.type,
            message:this.message,
        })
    },

    async generateSequence(sqnName){
        const sequenceGenerate = await orderService.getSequence(sqnName);
        return sequenceGenerate.sequenceValue;
    }
};
const utilsFactory = () => Object.create(utils);
module.exports = utilsFactory;