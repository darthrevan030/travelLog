const notFound = (req, res, next) => {
    const error = new Error(`These (${req.originalUrl}) are not the routes you are looking for`) // error message for the 404 
    res.status(404);
    next(error); // will go on to the next middleware --> error passed in so it will go into the error handler
};

const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // check if the status code is 200 --> means something else fucked up
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE.ENV === 'production' ? '🥞' : error.stack // should not do this in prod --> only show in prod --> security risk
    })
};


module.exports = {
    notFound,
    errorHandler
};