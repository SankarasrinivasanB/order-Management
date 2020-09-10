const db = require("../models");

const initialise = {
    initDb(){
        db.mongoose.connect(db.url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }).then(()=>{
            console.log("Database connected successfully",db.url)
        }).catch( err => {
            console.log("Cannot connect to database!",err)
            process.exit()
        })
    }
   
}
module.exports = initialise;