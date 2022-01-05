const express = require('express') // importando express
const routes = express.Router();

const UserController = require('./controllers/UserController')

routes.get('/users', UserController.index)

module.exports = routes