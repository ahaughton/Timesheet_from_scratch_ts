const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const projectRoute = require('./routes/projectactivities');

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true},{ useFindAndModify: false },
() => console.log (' connected to db!') );

app.use(express.json());

app.use('/',projectRoute);

app.listen (3000, () => console.log('Server is up and running'));
