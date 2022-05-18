const { Router } = require("express")
const { generarProducts } = require("../public/js/faker")
const router = Router()


router.get("/",(req, res) =>{
    res.render("index")
})

router.get("/api/productos-test", (req, res) => {
    const productosFake = generarProducts()
    res.render("productos-test", {productos: productosFake})
})

module.exports = router