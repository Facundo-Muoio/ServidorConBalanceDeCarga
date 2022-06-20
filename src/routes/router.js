const { Router } = require("express")
const { generarProducts } = require("../public/js/faker")   
const router = Router()
const passport = require("passport")
const { fork } = require("child_process")
const { cpus } = require("os")
const CPUs = cpus().length
const cluster = require("cluster")
const http = require("http")



router.get("/",(req, res) =>{
   res.render("index")
})

router.get("/api/productos-test", (req, res) => {
    const productosFake = generarProducts()
    res.render("productos-test", {productos: productosFake})
})

router.get("/api/registration", (req, res) => {
    res.render("registration")
})

router.post("/api/registration", passport.authenticate("registration", {
    successRedirect: "/api/login",
    failureRedirect: "/api/failregister",
    passReqToCallback: true
}))

router.get("/api/login", (req, res) => {
    res.render("login")
})

router.post("/api/login", passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/api/faillogin",
  passReqToCallback: true
}))

router.get("/api/faillogin", (req, res) => {
    res.render("faillogin")
}
)
router.get("/api/failregister", (req, res) => {
    res.render("failregister")
})

router.get("/api/logout", (req, res) => {
    req.logout((err) => {
        if(err){
            console.log(err)
        } else {
            res.redirect("/")
        }
    })
})

router.get("/info", (req, res) => {
    const entryArguments = process.argv
    const systemName = process.platform
    const versionNode = process.version
    const memory = process.memoryUsage()
    const path  =   process.execPath
    const processId = process.pid
    const projectDirectory = process.cwd()
    const numCpus = CPUs
    console.log(numCpus)

    res.render("info", {entryArguments, systemName, versionNode, memory, path, processId, projectDirectory, numCpus})
})

router.get("/api/randoms", (req, res) => {
    const computo = fork("./src/computo.js")
    computo.send(req.query)
    computo.on("message", resultado => {
        res.json({ resultado })
    })
})

module.exports = router