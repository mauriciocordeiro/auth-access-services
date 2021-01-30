const express = require('express')
const routes = express.Router()
const AuthController = require('../controllers/auth.controller')

routes.post('/login', AuthController.login)
routes.post('/logout', AuthController.logout)

module.exports = routes