const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');


const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: 'https://localhost:3000',
}));


// middleware
app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    })
});

app.use((req, res, next) => {
    const error = new Error(`These (${req.originalUrl}) are not the routes you are looking for`) // error message for the 404 
    res.status(404);
    next(error); // will go on to the next middleware --. error passed in so it will go into the error handler
});

// error handling middleware
app.use((error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // check if the status code is 200 --> means something else fucked up
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE.ENV === 'production' ? '🥞' : error.stack // should not do this in prod --> only show in prod --> security risk
    })
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`); // backticks `` to ensure its not a string literal
});
