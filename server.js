const mysql = require("mysql");
const inquirer = require("inquirer");
const pw = require("./pw");

// create sql connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: pw,
  database: "employee_tracker",
});
