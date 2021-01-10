const express = require('express')
const routes = express.Router()
const AuthController = require('../controllers/auth.controller')

routes.get('/login', AuthController.login)
routes.get('/logout', AuthController.logout)

module.exports = routes