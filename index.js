const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const postRouter = require('./routes/posts');
//Imports Routes
const authRoute = require('./routes/auth');

dotenv.config();

//conect db
mongoose.connect(process.env.DB_CONNECT,() => console.log('connected to db'))

//Middleware
app.use(express.json());

//Route Middlewars
app.use('/api/user', authRoute);
app.use('/api/posts', postRouter);

app.listen(3000,() => console.log('Server Up and running'));
