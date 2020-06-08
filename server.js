const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const body_parser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* Routes */
const web_router = require('./routes/web');
const api_router = require('./routes/api');
app.use('/', web_router)
app.use('/api/', api_router);

// app.get('/', async (req, res) => {
//     res.render('index');
// });

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// module.exports = { pool }