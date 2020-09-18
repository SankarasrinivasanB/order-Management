const config = require("../config/config");
const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";

const configEnv = config[env];

module.exports ={
   // url : `mongodb://${configEnv.host}:27017/`+`${configEnv.database}`
    url : `mongodb://userWBD:cKicGbDvQBHxiRf1@mongodb/sampledb`
}