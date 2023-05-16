const routes = require('express').Router()
const users = require('./users');
const recipes = require('./recipes');
const passport = require('passport');
//const authController = require('../controllers/authenticate');

routes.use('/users', users)
routes.use('/recipes', recipes)

routes.get('/login', passport.authenticate('github'), (req, res) => {});
routes.get('/logout', function(req, res, next){
    req.logout(function(err){
        if (err) { return next(err); }
        res.redirect('/')
    });
});


module.exports = routes