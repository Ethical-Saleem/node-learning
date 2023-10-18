const http = require("http");
const path = require("path");

// importing third-party packages
const express = require("express");
const bodyPasrser = require("body-parser");

const rootDir = require("./utils/path");

const sequelize = require("./utils/database");
const Product = require("./models/products");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const app = express(); // creating express instance

app.set("view engine", "ejs");
app.set("views", "views");

// importing our routes
const adminRoutes = require("./routes/admin");
const prodRoutes = require("./routes/shop");

// Creating Middlewares
// create middlewares from topmost to bottom if you don't want to use the "next" argument
app.use(bodyPasrser.urlencoded({ extended: false })); //create a middleware for body parsing which must be topmost since all requests has to be parsed first
app.use(express.static(path.join(rootDir, "public"))); // for serving static files

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(prodRoutes);

// creating 404 Not Found Page
app.use((req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "404 Not found",
    path: "/not-found",
  });
});

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem});

sequelize
  .sync()
  .then((res) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        fullName: "Olubisi Ayeni",
        email: "testemail@gmail.com",
        age: 23,
      });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// Using ".use" allows the middleware to handle all http methods (POST, GET, PUT, DELETE, etc)
