const path = require("path");

const express = require("express");

const rootDir = require("../utils/path")

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log("Testing II")
    res.sendFile(path.join(rootDir, 'views', 'index.html'))
});

module.exports = router;

// Using ".use" allows the middleware to handle all http methods (POST, GET, PUT, DELETE, etc)
