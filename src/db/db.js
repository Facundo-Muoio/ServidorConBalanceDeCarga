const { MongoClient } = require("mongodb")

//Conection URL
const url = "mongodb://localhost:27017"
const client = new MongoClient(url)


//Database Name


async function connectDB(){
    try{
        await client.connect();
        console.log("Connected succesfully to DB")
        const db = client.db("normalizacion")
        const mensajes = db.collection("mensajes")
        return mensajes
    }catch(err){
        console.log(err)
    }   
}

module.exports = { connectDB }