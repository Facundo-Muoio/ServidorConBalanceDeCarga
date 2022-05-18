const { faker } = require("@faker-js/faker") 

function generarProducts(){
    const productosFake = []
    function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
     }
    for(let i = 0; i < 5 ; i++){
    let number = getRandomInt(1, 50)
    let auto = "auto/" + number
    let productoFake = {
        nombre:  faker.vehicle.vehicle(),
        precio:  faker.finance.amount(),
        foto:  faker.image.imageUrl(`${auto}`)
    }
    productosFake.push(productoFake)
    }
    return productosFake
}


module.exports = {generarProducts}