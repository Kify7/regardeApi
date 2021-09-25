const express = require('express');
const app = express();
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const PORT = process.env.PORT;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Regarde API',
            version: '1.0.0',
            description: 'Regarde API Documentation',
        },
        servers: [{
            url: `http://localhost:${ PORT }/v1`,
        }]
    },
    apis: ["./Routes/*.js"]
}

const specs = swaggerJsDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

//connection db
const mongoose = require('mongoose');
console.log(process.env.DB_CONNECTION)
mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(res => {
        console.log('Connected to database ' + res.connections[0].name + ' ...');
    }).catch(err => {
        console.log('Error to connect to database!');
    });

mongoose.set("debug", true);

require('./models/User');
require('./models/Movie')
require('./models/Comment')
require('./config/passport')


app.use('/v1', require('./Routes'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});