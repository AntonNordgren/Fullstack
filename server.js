
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 5000;

const app = express();

app.use(cors());

mongoose.connect('mongodb://localhost/albums');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

app.use((err, req, res, next) => {
    res.status(422).send({error: err.message});
});

app.listen(port, () => { console.log(`Server at port ${port}.`)});