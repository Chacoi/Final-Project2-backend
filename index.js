const express           = require('express');
const app               = express();
const path              = require('path');
const mongoose          = require('mongoose');
const methodOverride    = require('method-override');
const discusionRoute = require('./routes/discusion.route');
const userRoute = require('./routes/user.route');
const comentarioRoute = require('./routes/comentario.route');
const resenaRoute = require('./routes/resena.route');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

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
app.use('/api/discusion', discusionRoute);
app.use('/api/usuario', userRoute);
app.use('/api/comentario', comentarioRoute);
app.use('/api/resena', resenaRoute);


//Create port
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log('Conectado al puerto ' + port);
})


// app.listen(3000, (req, res) => {
//     console.log('Servidor funcionando correctamente');
// });