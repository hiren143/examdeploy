const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var app = express();
const path = require('path');
app.use(bodyParser.json());

const { mongoose } = require('./db.js');

var userController = require('./controllers/users');
var questionController = require('./controllers/question');



app.use(cors());



app.use('/user' ,userController);
app.use('/question',questionController);

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('build'))
}

app.listen(process.env.PORT || 4000, () => console.log('Server started at port : 4000'));
