const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initiallizeDatabase=async()=>{
    await mongoose.connect(mongoUri).then(()=>{
        console.log("Connected to database successfully")
    }).catch((error)=>console.log("error connectinng to database",error));
}
module.exports={initiallizeDatabase};