const client = require("./db/client");
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.use('/api', require("./api/index"));
app.use('*', (req, res) => {
    res.status(404);
    res.send({
        error: 'PageNotFound',
        message: 'Page not found!'
    });
});
app.use((err, req, res, next) => {
    res.status(500);
    res.send({
        name: err.name,
        message: err.message
    });
});
app.listen(PORT, () => {
    client.connect();
    console.log(`Server listening on port ${PORT}`);
});