const mysql = require("mysql");
const inquirer = require("inquirer");
const pw = require("./pw");

// create sql connection
var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: pw,
  database: "employee_tracker",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id" + connection.threadID + "\n");
  readEmployees();
});

function readEmployees() {
  console.log("Selecting all employees");
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}
