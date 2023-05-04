const routes = require('express').Router()
const users = require('./users');
const recipes = require('./recipes');


routes.use('/users', users)
routes.use('/recipes', recipes)

module.exports = routes