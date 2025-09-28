const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const middlewares = require('./middlewares');


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

    // 404 middleware
app.use(middlewares.notFound);

    // general error handling middleware
app.use(middlewares.errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`); // backticks `` to ensure its not a string literal
});
