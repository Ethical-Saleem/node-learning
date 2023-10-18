const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node-sql-leaning", "root", "chasesuno6", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
