function incrementRandomNun () {
    let randomNum = Math.round(Math.random() * (1000 - 1) + 1)
    if(!objNum[randomNum]){
        objNum[randomNum] = 1
    } else {
        objNum[randomNum] += 1 
    }  
}

function randomNums(cantidadNumeros) {
    Number(cantidadNumeros)
    objNum = {}
    if(!cantidadNumeros){
        for(let i = 0 ; i < 100000000; i++){
        incrementRandomNun()
        }
    } else {
        for(let i = 0; i < cantidadNumeros; i++){
        incrementRandomNun()
        }
    } return objNum
}

// const num = randomNums(undefined)
// console.log(num)


process.on("message", num => {
   console.log(num)
   const nums = randomNums(num.cant)
   process.send( nums )
   process.exit()
})