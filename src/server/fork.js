process.on('exit', () => {
    console.log(`worker ${process.pid} cerrado`)
})

process.send('start')

process.on('message', ({ PORT }) => {
    console.log(`Proceso Fork: Puerto: ${PORT} - pid: ${process.pid}`)
})

