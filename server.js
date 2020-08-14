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

// calls function to access sql tables
connection.connect(function (err) {
  if (err) throw err;
  console.log("You are now connected");
  promptUser();
  //   readEmployees();
  //   financeEmployees();
});

// Displays all employees
function readEmployees() {
  console.log("Selecting all employees");
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}

// function financeEmployees() {
//   console.log("Selecting all finance employees");
//   connection.query(("SELECT FROM employee WHERE department_id" = 1), function (
//     err,
//     res
//   ) {
//     if (err) throw err;
//     console.log(res);
//     connection.end();
//   });
// }

function promptUser(answers) {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View Employees",
          "Add Employee",
          "Delete Employee",
          "Edit Employee",
        ],
      },
    ])
    .then((answers) => {
      if (answers.action === "View Employees") {
        readEmployees();
      }
    });
}
