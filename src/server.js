const express = require('express') // importando express
const routes = require('./routes') // chamando o caminho de rotas

const app = express()  // utilizando o express
app.use(routes) // utilizando rotas


app.listen(3333, () => console.log('Server is running')) // ouve a porta e depois roda um função

