require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const middlewares = require('./middlewares');
const logs = require('./api/logs');


const app = express();

mongoose.connect(process.env.DATABASE_URL);
const db = process.env.DATABASE_URL
app.listen(db, () => {
    console.log(`Listening at ${db}`);
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());


// middleware
app.get('/', (req, res) => {
    res.json({
        message: 'This is my App'
    })
});


app.use('/api/logs', logs);

    // 404 middleware
app.use(middlewares.notFound);

    // general error handling middleware
app.use(middlewares.errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`); // backticks `` to ensure its not a string literal
});
