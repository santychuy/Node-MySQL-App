const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');

//Inits
const app = express();


//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');


//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(flash());


//Global Variables
app.use((req, res, next) =>{
    app.locals.success = req.flash('success');
    next();
});


//Routes
app.use(require('./routes/index.routes'));
app.use('/auth', require('./routes/auth.routes'));
app.use('/links', require('./routes/links.routes'));


//Public Files
app.use(express.static(path.join(__dirname, 'public')));


//Run Server
app.listen(app.get('port'), () =>{
    console.log('Server on port: ',app.get('port'))
});