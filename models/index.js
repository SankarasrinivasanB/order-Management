const dbConfig = require("../config/db");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const db ={}
/* 'useFindAndModify': true by default. 
Set to false to make findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() rather than findAndModify() */
mongoose.set('useFindAndModify', false); 
db.mongoose = mongoose;
db.url = dbConfig.url;

db.orders = require("./orderModel")(mongoose);
db.sequenceGenerator = require("./sequenceGeneratorModel")(mongoose);
db.users = require("./userModel")(mongoose);
module.exports = db;