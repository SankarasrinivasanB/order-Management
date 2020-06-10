const express = require("express");
const app = express();
const routes = require("./routes/orderRouter")
const bodyParser = require("body-parser")
const config = require("./config/initDb")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

config.initDb();

app.use("/api/v1/orders",routes)
app.get("*",(req,res)=>{
    res.status(200).send({
        message : "Welcome to orders management"
    })
})
const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log("Server is listening on port : ",PORT);
})

