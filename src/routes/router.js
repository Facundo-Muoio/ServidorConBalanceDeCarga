const { Router } = require("express")
const { generarProducts } = require("../public/js/faker")   
const router = Router()
const passport = require("passport")



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

module.exports = router