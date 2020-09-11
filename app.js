const passport = require('passport');
const express = require("express");
const createError = require('http-errors');
const app = express();
const routes = require("./routes/orderRouter")
const bodyParser = require("body-parser")
const config = require("./config/initDb")
const cors = require("cors")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

config.initDb();

require('../src/config/passport');

app.use(cors());
console.log("in app server")
app.use(passport.initialize());
app.use("/api/v1/orders",routes)

// catch 404 and forward to error handler
/* app.use((req, res, next) => {
  next(createError(404));
}); */

// Catch unauthorised errors
/* app.use((err, req, res) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ message: `${err.name}: ${err.message}` });
  }
}); */
app.get("*",(req,res)=>{
    res.status(200).send({
        message : "Welcome to orders management"
    });
})

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log("Server is listening on port : ",PORT);
})

module.exports = app;
