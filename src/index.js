const express = require("express")
const app = express()
const { createServer } = require("http")
const { Server } = require("socket.io")
const httpServer = createServer(app)
const io = new Server(httpServer)
const morgan = require("morgan")
const path = require("path")
const router = require("./routes/router")
const Mensajes = require("./contenedores/mensajes")
const mensaje = new Mensajes()



//setting server
app.set("port", process.env.PORT || 3000)
app.set("views", path.join(__dirname, "public/views"))
app.set("view engine", "ejs")

//middlewares
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes
app.use(router)


//socket.io
io.on("connection", async (socket) => {
    // console.log("Socket conectado: " + socket.connected)
    console.log("Socket id: " + socket.id)

    async function listarMensajes(){
        io.emit("mensajesGuardados:server", await mensaje.getMessages())
    }
    
    listarMensajes()

    socket.on("menasjeClienteSide", async (data) => {
        await mensaje.saveMessage(data)
        io.emit("mensajesServerSide", await mensaje.getMessages())
    })

})

//starting server
httpServer.listen(app.get("port"), () => console.log(`Server listen on port ${app.get("port")}`))

