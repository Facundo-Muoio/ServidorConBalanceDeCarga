const { connectDB } = require("./db")

async function algo(){
    const collection = await connectDB()
    return collection
}

// class Mensajes {
//     constructor(){
//     }

//     async getAllMessages(){
//         try{
//             const collection = connectDB()
//             const mensajesGuardados = await db.collection("mensajes").find({}).toArray()
//             return mensajesGuardados
//         }catch(err){
//             console.log(err)
//         }
        
//     }

//     async saveMessages(mensaje){
//         try{
//             const db = connectDB()
//             await db.collection("mensajes").insertOne(mensaje)
//             console.log(`Mensaje guardado ${mensaje}`)
//         }   catch(err){
//             console.log(err)
//         }
//     }

//     async deleteAllMessages(){
//         try{
//         const db = connectDB()
//         await db.collection("mensajes").deleteMany({})   
//         } catch(err){
//             console.log(err)
//         }
//     }
// }

// module.exports = Mensajes