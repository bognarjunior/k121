const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = require('./routes/route');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use( (req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

const porta = process.env.PORT || 3000;

app.use('/api', router);
app.listen(porta, () => console.log('Servidor rodando na porta: ' + porta +"!"));