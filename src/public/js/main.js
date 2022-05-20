const socket = io();


const formulario = document.querySelector("#form")
const chat = document.querySelector("#cajaDeMensajes")
const chatHeader = document.querySelector("#cardHeader")


formulario.addEventListener("submit", (e) => {
    e.preventDefault()
    const date = new Date()
    const mensaje =  {
        autor: {
            id: formulario["email"].value,
            nombre: formulario["nombre"].value,
            apellido: formulario["apellido"].value,
            edad : formulario["edad"].value,
            alias: formulario["alias"].value,
            avatar: formulario["avatar"].value,
            fecha: date.toLocaleDateString(),
            hora: date.toLocaleTimeString()
        }, 
        mensaje: formulario["mensaje"].value
    }
    socket.emit("menasjeClienteSide", mensaje)
    formulario.reset()
})

//Schemas
const autorSchema = new normalizr.schema.Entity("authors")
const mensajeSchema = new normalizr.schema.Entity("mensajes",{ author: autorSchema}, {idAttribute: 'id'})
const grupoMensajes = [mensajeSchema]


socket.on("mensajesGuardados:server", (msj) => {
    //aca desnormalizamos
    const mensajes = normalizr.denormalize(msj.result, grupoMensajes, msj.entities)
    Compresion(mensajes, msj)
    if(mensajes.length === 0){
        chat.innerHTML = `<h6 class="text-center">NO HAY MENSAJES</h6>`
    } else {
        chat.innerHTML = " "
        mensajes.forEach( e => {
            chat.innerHTML +=  `<p>${e._doc.autor.id} [${e._doc.autor.fecha} ${e._doc.autor.hora}]: ${e._doc.mensaje}</p>`
           })
    }
})

socket.on("mensajesServerSide", (msj) => {
    //aca tenemos que desnormalizarlo
    const mensajes = normalizr.denormalize(msj.result, grupoMensajes, msj.entities) 
    Compresion(mensajes, msj)
    chat.innerHTML = " "
    mensajes.forEach( e => {
        chat.innerHTML +=  `<p>${e._doc.autor.id} [${e._doc.autor.fecha} ${e._doc.autor.hora}]: ${e._doc.mensaje}</p>`
    })  
})

const Compresion = (msjOriginal, msjComprimido) => {    
    const longOriginal = JSON.stringify(msjOriginal).length
    console.log(longOriginal)
    const longComprimido = JSON.stringify(msjComprimido).length
    console.log(longComprimido)
    const porcentajeCompresion = ((longOriginal - longComprimido) * 100) / longOriginal
    chatHeader.innerHTML = `Centro de Mensajes (Compresión: ${porcentajeCompresion.toFixed(2)}%)` 
}