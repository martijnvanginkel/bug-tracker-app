const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', async (req, res) => {
    res.render('index');
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
