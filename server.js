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
  // promptUser();
  //   readEmployees();
  // managers();
  financeEmployees();
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

function managers() {
  console.log("Selecting all managers");
  connection.query("SELECT * FROM employee WHERE role_id<5", function (
    err,
    res
  ) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}

function financeEmployees() {
  console.log("Selecting all finance employees");
  connection.query(
    "SELECT first_name, last_name, title, salary, name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE ?",
    { name: "Finance" },
    function (err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    }
  );
}

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
