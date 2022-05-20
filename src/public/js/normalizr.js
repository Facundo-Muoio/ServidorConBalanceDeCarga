const { schema, normalize } = require("normalizr")

//normalizacion 
const autorSchema = new schema.Entity("authors")
const mensajeSchema = new schema.Entity("mensajes",{ author: autorSchema}, {idAttribute: 'id'})
const grupoMensajes = [mensajeSchema]

 //normalizando
   const normalizeMensaje = (mensaje) => {
    const normalizedMensajes = normalize(mensaje, grupoMensajes)
    return normalizedMensajes
}


module.exports = { normalizeMensaje }
