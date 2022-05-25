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

const cookieParser = require("cookie-parser")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}



//setting server
app.set("port", process.env.PORT || 3000)
app.set("views", path.join(__dirname, "public/views"))
app.set("view engine", "ejs")

//middlewares
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser("secreto"))
app.use(session({
    store: MongoStore.create({mongoUrl: "mongodb+srv://facundo:facundo@coderback.r5nm3.mongodb.net/?retryWrites=true&w=majority", 
    mongoOptions: advancedOptions}
    ),
    secret: "secreto",
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))

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

