const { Router } = require('express');
const LogEntry = require('../models/LogEntry');

const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: '🌐',
    })
});

router.post('/', (req, res) => {
    const LogEntry = new LogEntry(req.body);
    console.log(req.body)
    res.json({
        message: "Log Posted",
    })
});

module.exports = router;