const express = require('express') // importando express
const routes = require('./routes') // chamando o caminho de rotas

const app = express()  // utilizando o express

app.use(express.json()) // utilizando json no express
app.use(routes) // utilizando rotas

// notFound
app.use((req, res, next) => {
    const error = new Error(`Not found`)
    error.status = 404
    next(error)
})

// cactch all
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({error: error.message})
})

app.listen(3333, () => console.log('Server is running')) // ouve a porta e depois roda um função

