const http = require("http");
const path = require("path");

// importing third-party packages
const express = require("express");
const bodyPasrser = require("body-parser");

const rootDir = require("./utils/path")

// importing our routes
const adminRoutes = require("./routes/admin");
const messageRoutes = require("./routes/messages");

const app = express() // creating express instance

// Creating Middlewares
// create middlewares from topmost to bottom if you don't want to use the "next" argument
app.use(bodyPasrser.urlencoded({extended: false})) //create a middleware for body parsing which must be topmost since all requests has to be parsed first
app.use(express.static(path.join(rootDir, 'public'))); // for serving static files

app.use('/admin', adminRoutes);
app.use(messageRoutes);

// creating 404 Not Found Page
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views', 'not-found.html'))
})

app.listen(3000)

// Using ".use" allows the middleware to handle all http methods (POST, GET, PUT, DELETE, etc)
