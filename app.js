const express = require('express');
const app = express();
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//conecction db
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(res => {
        console.log('Connected to database ' + res.connections[0].name + ' ...');
    }).catch(err => {
        console.log('Error to connect to database!');
    });

mongoose.set("debug", true);

require('./models/Admin');
require('./models/Movie')
require('./models/Comment')


app.use('/v1', require('./routes'));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
