require('dotenv').config();
const express = require("express"),
    bodyParser = require("body-parser"),
    cors = require('cors'),
    morgan = require('morgan'),
    swaggerUI = require('swagger-ui-express'),
    swaggerJsDoc = require('swagger-jsdoc'),
    castlesRouter = require('./routes/castles'),
    m2s = require('mongoose-to-swagger'),
    Castle = require('./model/castle');


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Westeros Castles API',
            version: '1.0.0',
            descripton: '3 laboratorijska vjezba iz OR2022',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            }
        ],
    },
    apis: [
        './routes/*.js',
    ],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
const db =  mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected'));

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/castles', castlesRouter)

app.use('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
})

var server = app.listen(process.env.PORT, () => console.log("app running on port.", server.address().port));
