const mongoose = require("mongoose")

//Conection URL
const url = "mongodb://localhost:27017/normalizacion"

 async function connect () {
     try{
        await mongoose.connect(url)
        console.log("Connected succesfully to DB")
     }catch(err){
         console.log(err)
     }
 }

 module.exports = { connect }


