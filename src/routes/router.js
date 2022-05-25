const { Router } = require("express")
const { generarProducts } = require("../public/js/faker")   
const router = Router()



router.get("/",(req, res) =>{
    if(req.session.name){
        res.render("index", {userName: req.session.name})
    } else {
        res.redirect("/api/login")
    }
})

router.post("/", (req, res) => {
    req.session.name = req.body.name
    res.render("index", {userName: req.session.name})
})

router.get("/api/productos-test", (req, res) => {
    const productosFake = generarProducts()
    if(req.session.name){
        res.render("productos-test", {productos: productosFake, userName: req.session.name})
    } else {
        res.redirect("/api/login")
    }
})

router.get("/api/login", (req, res) => {
    res.render("login", {userName: req.session.name})
})


router.get("/api/logout", (req, res, next) => {
    let nombre = req.session.name
    if(nombre){
        req.session.destroy(err => {
        if(!err){
            res.render("logout", {userName: nombre})
        } else {
            res.json({error: err})
        }
    })
    } 
})

module.exports = router