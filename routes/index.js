const routes = require('express').Router()
const users = require('./users');
const recipes = require('./recipes');
const passport = require('passport');
const authController = require('../controllers/authenticate');


routes.use('/users', users)
routes.use('/recipes', recipes)

routes.get('/login', passport.authenticate('github'), (req, res) => {});
routes.get('/logout', function(req, res, next){
    req.logout(function(err){
        if (err) { return next(err); }
        res.redirect('/')
    });
});

// Ruta para manejar el callback de la autenticación de GitHub
routes.get('/github/callback', authController.handleCallback);
routes.get('/', (req, res) => {
    res.send(req.session.user != undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")
});

module.exports = routes