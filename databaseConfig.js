// Connect to database
const mysql = require("mysql");

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: ""
  }

  module.exports = {
    connection: mysql.createPool(config, console.log('DATABASE-----------OK'))
  }