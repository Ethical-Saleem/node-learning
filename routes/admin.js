const path = require("path");

const express = require("express");

const rootDir = require("../utils/path")

const router = express.Router(); // Declare an express router

router.get('/messages', (req, res, next) => {
    // use ".send" to send a response
    res.sendFile(path.join(rootDir, 'views', 'messages.html'))
});

// This middleware will only run for "POST" requests
router.post('/postMessage', (req, res, next) => {
    console.log(req.body)
    res.redirect('/') // for redirecting
});

module.exports = router;

// Using ".use" allows the middleware to handle all http methods (POST, GET, PUT, DELETE, etc)
