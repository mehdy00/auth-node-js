const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Body parser
app.use(express.json());

//Get dotenv config
dotenv.config();

//Connect to db
mongoose.connect(process.env.DB_CONNECTION, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
},
() => { console.log('connected to DB')
});

//Import routes
const userRoute = require('./routes/user');

//Routes Middleware
app.use('/user/', userRoute);


app.listen(3000, () => console.log('Server listening on 3000'));