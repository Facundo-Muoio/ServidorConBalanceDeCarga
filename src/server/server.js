
const child = require('child_process')
const cluster = require("cluster")
const { cpus } = require('os') 
const path = require("path")


class ServerClusterFork {

    constructor() { }

    fork = (PORT, server) => {
        try {
            const forkServer = child.fork(path.join(__dirname, "./fork.js"))
            server
                .listen(PORT, () => {
                    forkServer.on('message', () => {
                        forkServer.send({ PORT })
                        console.log(`Oyendo desde ${server.address().port} - http://localhost:${PORT}`)
                    })
                })
                .on('error', error => { console.log('error hubo', error) })
        }
        catch (err) { console.log('catcherror') }
    }


    cluster = (PORT, server) => {

        const numCPUs = cpus().length

        if (cluster.isPrimary) {

            console.log('Número de clusters(procesadores) posibles:', numCPUs)
            console.log(`Master ${process.pid}: INICIALIZADO`)

            for (let i = 0; i < numCPUs; i++) { cluster.fork() }

            cluster.on('exit', worker => {
                console.log('worker', worker.process.pid, 'caído -', new Date().toLocaleString())
                cluster.fork()
            })

        } else {
            console.log(`Proceso Cluster: Puerto: ${PORT} - pid: ${process.pid}`)
            server
                .listen(PORT, () => { console.log(`Oyendo desde ${server.address().port} - http://localhost:${PORT}`) })
                .on('error', error => console.log('error hubo', error))
        }
    }
}

module.exports = ServerClusterFork 