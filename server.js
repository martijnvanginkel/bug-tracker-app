const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// const pool = new pg.Pool({
//     user: 'postgres',
//     password: 'password',
//     host: 'localhost',
//     port: 5432,
//     database: 'bugtracker',
//     max: 5,
//     connectionTimeoutMillis: 0,
//     idleTimeoutMillis: 0
// });

/* Routes */
const projectAPIRouter = require('./routes/api/projects');
app.use('/api/projects', projectAPIRouter);

app.get('/', async (req, res) => {
    res.render('index');
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// module.exports = { pool }