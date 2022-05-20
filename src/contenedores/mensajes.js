const mongoose = require("mongoose")
const { Schema } = require("mongoose")
const { connect } = require("../db/db")
const { normalizeMensaje } = require("../public/js/normalizr")

connect()

const mensajeSchema = new Schema ({
    autor: {
        id: {type: String, required: true},
        nombre: {type: String, required: true}, 
        apellido: {type: String, required: true},
        edad: {type: String, required: true},
        alias: {type: String, required: true},
        avatar: {type: String, required: true},
        fecha: {type: String, required: true},
        hora: {type: String, required: true}
    },
    mensaje: {type: String, required: true}
})

const Mensaje = mongoose.model("mensaje", mensajeSchema)



class Mensajes {
    constructor(){
    }

    async saveMessage(data){
        try{
            const nuevoMensaje = new Mensaje(data)
            await nuevoMensaje.save()
        }catch(error){
            console.log(error)
        }
    }
    
    async getMessages(){
        try{
            const mensajes = await Mensaje.find({})
            return normalizeMensaje(mensajes)
        }catch(err){
            console.log(err)
        }
    }
    
    async deleteAllMessages(){
        try{
            await Mensaje.remove({})
            console.log("Mensajes borrados con exito")
        }catch(err){
            console.log(err)
        } 
    }
}

module.exports = Mensajes