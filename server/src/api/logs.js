const { Router } = require('express');
const LogEntry = require('../models/LogEntry');

const router = Router();


// create a new log
router.post('/', async (req, res, next) => {
    try {
        const logEntry = new LogEntry(req.body);
        const createdEntry = await logEntry.save();
        res.json(createdEntry);
    } catch (error){
        if (error.name === 'ValidationError'){
            res.status(422);
        }
        next(error);
    }
});


// update an entry
router.put('/:id', async (req, res, next) => {
    try {
        const updatedLog = await LogEntry.findByIdAndUpdate(
            req.params.id, 
            req.body,
        {
            new: true,
            runValidators: true
        });

        if (!updatedLog) {
            return res.status(404).json({ message: "Log Entry Not Found" });
        }

        res.status(200).json({ message: "Entry Updated" });
    } catch (error) {
        if (error.name === 'ValidationError'){
            res.status(422);
        }
        next(error);
    }
});

// get (read) all the entries
router.get('/', async (req, res, next) => {
    try {
        const logEntries = await LogEntry.find({});
        res.json(logEntries);
    } catch (error) {
        next(error);
    }
    
});


// delete entry
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedLog = await LogEntry.findByIdAndDelete(req.params.id);
        if (!deletedLog){
            return res.status(404).json({ message: "Log Entry Not Found" });
        }
        res.json(deletedLog);
    } catch (error) {
        next(error);
    }
});

module.exports = router;