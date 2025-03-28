const mongoose = require("mongoose");


const connectToDB = async ()=>{
  try {
    mongoose.set("strictQuery",false);
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Mongo DB ✅");
    
  } catch (error) {
    console.log("Appear error some thing wrong ❌:",error);
    process.exit();
  }
}

module.exports = connectToDB ;
