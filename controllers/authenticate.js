const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const mongodb = require('../db/connect')


// Configurar la estrategia de autenticación de GitHub
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
}, function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

// Serializar y deserializar al usuario
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


const handleCallback = (req, res) => {
  const githubProfile = req.user;

  passport.authenticate('github', {
    failureRedirect: 'api-docs',
    session: false
  });

  const collection = mongodb.getDb().db().collection('users')

  const newUser = {
    githubId: githubProfile.id,
    name: githubProfile.displayName,
    email: githubProfile.emails[0].value
  }
  /////
  collection.insertOne(newUser, function(err, result) {
    if (err) { return done(err); }
  
    req.logIn(result.ops[0], function(err) {
      if (err) { return done(err); }
      req.session.user = req.user;
      return res.redirect('/');
    })

  })

};

module.exports = {
  handleCallback
}