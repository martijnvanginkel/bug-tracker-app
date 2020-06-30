require('dotenv').config();
const path = require('path');
const http = require('http');
const express = require('express');
const cookie_parser = require('cookie-parser');
const session = require('express-session');
const flash = require('req-flash');
const app = express();
const server = http.createServer(app);
const method_override = require('method-override');



app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(method_override('_method'));
app.use(cookie_parser());
app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false
}));
app.use(flash());

/* Routes */
const web_router = require('./routes/web');
const api_router = require('./routes/api');
app.use('/', web_router)
app.use('/api/', api_router);

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
