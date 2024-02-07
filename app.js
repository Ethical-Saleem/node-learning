const http = require("http");
const path = require("path");

// importing third-party packages
const express = require("express");
const bodyPasrser = require("body-parser");

const rootDir = require("./utils/path");

const mongoose = require("mongoose");

const app = express(); // creating express instance

const User = require("./models/user");

app.set("view engine", "ejs");
app.set("views", "views");

// importing our routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// Creating Middlewares
// create middlewares from topmost to bottom if you don't want to use the "next" argument
app.use(bodyPasrser.urlencoded({ extended: false })); //create a middleware for body parsing which must be topmost since all requests has to be parsed first
app.use(express.static(path.join(rootDir, "public"))); // for serving static files

app.use((req, res, next) => {
  User.findById("65c38c7b2defe6963cd12efb")
    .then((user) => {
      req.user = new User(
        user.firstName,
        user.lastName,
        user.email,
        user.telephone,
        user.address,
        user.userCode,
        user._id,
        user.cart
      );
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

// creating 404 Not Found Page
app.use((req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "404 Not found",
    path: "/not-found",
  });
});

mongoose
  .connect(
    "mongodb+srv://abdussalam:chasesuno6@node-learn.qge821f.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// Using ".use" allows the middleware to handle all http methods (POST, GET, PUT, DELETE, etc)
