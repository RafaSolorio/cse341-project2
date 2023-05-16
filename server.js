const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const mongodb = require('./db/connect')
const passport = require('passport')
const session = require('express-session')
const GitHubStrategy = require('passport-github2').Strategy
//const cors = require('cors')


const port = process.env.PORT || 5000
const app = express()


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(bodyParser.json())
    .use(session({
        secret: "secret",
        resave: false ,
        saveUninitialized: true ,
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        next()
    })
    .use('/', require('./routes'))

//passport.use(new GitHubStrategy({
//    clientID: process.env.GITHUB_CLIENT_ID,
//    clientSecret: process.env.GITHUB_CLIENT_SECRET,
//    callbackURL: process.env.CALLBACK_URL
//},
//function(accessToken, refreshToken, profile, done){
//    return done(null, profile);
//}
//))
//
//passport.serializeUser((user, done) => {
//    done(null, user);
//})
//passport.deserializeUser((user, done) => {
//    done(null, user);
//});
//
//app.get('/', (req, res) => {
//    res.send(req.session.user != undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")
//});
//app.get('/github/callback', passport.authenticate('github', {
//    failureRedirect: 'api-docs', session: false}),
//    (rer, res) => {
//        req.session.user = req.user;
//        res.redirect('/');
//    }
//)
  
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

process.on('uncaughtException', (err, origin) => {
    // eslint-disable-next-line no-console
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
})

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err)
    } else {
        app.listen(port)
        console.log(`Connected to DB and listening on ${port}`)
    }
})