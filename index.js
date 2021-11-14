if(process.env.NODE_ENV !== "production") {
  require("dotenv").config();
};
const express           = require('express');
const app               = express();
const path              = require('path');
const mongoose          = require('mongoose');
const methodOverride    = require('method-override');
const discusionRoute = require('./routes/discusion.route');
const userRoute = require('./routes/user.route');
const comentarioRoute = require('./routes/comentario.route');
const resenaRoute = require('./routes/resena.route');
const asignaturaRoute = require ('./routes/asignatura.route');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth');
const multer = require('multer');

const User = require('./models/Usuario');

mongoose.connect('mongodb://localhost:27017/2ndChance', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Conexion a la DB realizada correctamente");
})
.catch(err => {
    console.log("Conexion a la DB fallida");
    console.log(err);
});


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Credentials', true);
     next();
 });
 app.use(cors({ 
    origin: 'http://localhost:4200',
    credentials: true
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true}));   //Convierte strings en url
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: 'aggg',
    resave: true,
    cookie: { secure: false, httpOnly: false, _expires : new Date(Date.now() + 3600000), originalMaxAge : 3600000 },
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: 'mongodb://localhost:27017/2ndChance'})
}));
//---Passport config---
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});
passport.use(new FacebookStrategy({
    clientID: '871145953604001',
    clientSecret: 'f2830cc4cf44b67c4a5d72a2a57b24e4',
    callbackURL: "http://localhost:3000/api/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

/*
passport.use(new GoogleStrategy({
    consumerKey: 'www.example.com',
    consumerSecret: GOOGLE_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },
  function(token, tokenSecret, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));*/
//---Rutas---
app.use('/api/discusion', discusionRoute);
app.use('/api/usuario', userRoute);
app.use('/api/comentario', comentarioRoute);
app.use('/api/resena', resenaRoute);
app.use('/api/asignatura', asignaturaRoute);

//---Auth con Facebook---
app.get('/api/auth/facebook',
  passport.authenticate('facebook'));

app.get('/api/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.json(res);
  });
 

//Create port
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log('Conectado al puerto ' + port);
})


// app.listen(3000, (req, res) => {
//     console.log('Servidor funcionando correctamente');
// });