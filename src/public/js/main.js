const socket = io();


const formulario = document.querySelector("#form")
const chat = document.querySelector("#cajaDeMensajes")


formulario.addEventListener("submit", (e) => {
    e.preventDefault()
    const date = new Date()
    socket.emit("menasjeClienteSide", {
        id: formulario["email"].value,
        nombre: formulario["nombre"].value,
        apellido: formulario["apellido"].value,
        edad : formulario["edad"].value,
        alias: formulario["alias"].value,
        avatar: formulario["avatar"].value,
        mensaje: formulario["mensaje"].value,
        fecha: date.toLocaleDateString(),
        hora: date.toLocaleTimeString()
    })
    formulario.reset()
})

socket.on("mensajesServerSide", (mensajes) => {
   console.log(mensajes)
   if(mensajes){
       mensajes.forEach( e => {
        chat.innerHTML +=  `
       <p>${e.id} [${e.fecha} ${e.hora}]: ${e.mensaje}</p>
       `
       })
   } else {
        chat.innerHTML = `<h2>NO HAY MENSAJES REGISTRADOS EN EL CHAT</h2>`
   }
})
