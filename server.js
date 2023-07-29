const express = require('express');
const testRoutes = require('./routes/testRoutes');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/db');

//dot config
dotenv.config();

//mongoose connection
connectDB();

//REST object
const app = express(); //storing all the functionalities of express in the variable named app

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev')); //gives detail of the URL in the console

//routes
// 1 test route
app.use("/api/v1/test", require('./routes/testRoutes'));
app.use("/api/v1/auth", require('./routes/authRoutes'));


/**
 * 
    app.get('/', (req, res) => {  // we can send request and response in the callback function 
    res.status(200).json({
        message: "Welcome to the Blood Bank!",
    })
    })
    // if we update the message in the code it will not update on the port for that we need nodemon
 */

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => /*() is callback function*/ {
    console.log(
        `Node Server Running in ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}`
            .bgBlue.white
        );
});