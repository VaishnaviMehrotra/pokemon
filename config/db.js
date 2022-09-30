const mongoose = require('mongoose');
require("dotenv").config();


async function db(){
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
		useUnifiedTopology: true,
		
        });
        console.log("DB connected");
    }
    catch(err){
        console.log("DB Failed to Connect");
        console.log(err);
        process.exit(1);
    }
}
module.exports = db;