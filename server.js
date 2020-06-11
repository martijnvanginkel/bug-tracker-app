const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);



if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const bcrypt = require('bcrypt'); 
const passport = require('passport');
const methodOverride = require('method-override');

const initializePassport = require('./controllers/passport-config');
initializePassport.initialize(passport);


app.use(methodOverride('_method'));


const flash = require('express-flash');
const session = require('express-session');

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())




app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* Routes */
const web_router = require('./routes/web');
const api_router = require('./routes/api');
app.use('/', web_router)
app.use('/api/', api_router);

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
