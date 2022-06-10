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

process.on("message", num => {
   let key = Object.values(num)
   const nums = randomNums(key[0])
   process.send( nums )
   process.exit()
})