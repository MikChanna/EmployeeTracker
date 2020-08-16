const mysql = require("mysql");
const inquirer = require("inquirer");
const pw = require("./pw");
const chalk = require("chalk");
const figlet = require("figlet");

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
  init();
  promptUser();
  //   readEmployees();
  // managers();
  // supportEmployees();
});

// Displays all employees
function readEmployees() {
  console.log("Selecting all employees");
  connection.query(
    "SELECT first_name, last_name, title, salary, name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id",
    function (err, res) {
      if (err) throw err;
      console.log(
        chalk.green(
          "First Name  |  Last Name  |  Title  |  Salary  |  Department"
        )
      );
      // for loop to display all information selected
      for (var i = 0; i < res.length; i++) {
        console.log(
          chalk.blue(
            res[i].first_name +
              " | " +
              res[i].last_name +
              " | " +
              res[i].title +
              " | " +
              res[i].salary +
              " | " +
              res[i].name
          )
        );
      }
    }
  );
}

function managers() {
  console.log("Selecting all managers");
  connection.query("SELECT * FROM employee WHERE role_id<5", function (
    err,
    res
  ) {
    if (err) throw err;
    console.log(
      chalk.green(
        "First Name  |  Last Name  |  Title  |  Salary  |  Department"
      )
    );
    // for loop to display all information selected
    for (var i = 0; i < res.length; i++) {
      console.log(
        chalk.blue(
          res[i].first_name +
            " | " +
            res[i].last_name +
            " | " +
            res[i].title +
            " | " +
            res[i].salary +
            " | " +
            res[i].name
        )
      );
    }
  });
}

function financeEmployees() {
  console.log("Selecting all finance employees");
  connection.query(
    "SELECT first_name, last_name, title, salary, name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE ?",
    { name: "Finance" },
    function (err, res) {
      if (err) throw err;
      console.log(
        chalk.green(
          "First Name  |  Last Name  |  Title  |  Salary  |  Department"
        )
      );
      for (var i = 0; i < res.length; i++) {
        console.log(
          chalk.blue(
            res[i].first_name +
              " | " +
              res[i].last_name +
              " | " +
              res[i].title +
              " | " +
              res[i].salary +
              " | " +
              res[i].name
          )
        );
      }
    }
  );
}

function engineerEmployees() {
  console.log("Selecting all engineering employees");
  connection.query(
    "SELECT first_name, last_name, title, salary, name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE ?",
    { name: "Engineering" },
    function (err, res) {
      if (err) throw err;
      console.log(
        chalk.green(
          "First Name  |  Last Name  |  Title  |  Salary  |  Department"
        )
      );
      // for loop to display all information selected
      for (var i = 0; i < res.length; i++) {
        console.log(
          chalk.blue(
            res[i].first_name +
              " | " +
              res[i].last_name +
              " | " +
              res[i].title +
              " | " +
              res[i].salary +
              " | " +
              res[i].name
          )
        );
      }
    }
  );
}
function supportEmployees() {
  console.log("Selecting all support employees");
  connection.query(
    "SELECT first_name, last_name, title, salary, name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE ?",
    { name: "Support" },
    function (err, res) {
      if (err) throw err;
      console.log(
        chalk.green(
          "First Name  |  Last Name  |  Title  |  Salary  |  Department"
        )
      );
      // for loop to display all information selected
      for (var i = 0; i < res.length; i++) {
        console.log(
          chalk.blue(
            res[i].first_name +
              " | " +
              res[i].last_name +
              " | " +
              res[i].title +
              " | " +
              res[i].salary +
              " | " +
              res[i].name
          )
        );
      }
    }
  );
}
function salesEmployees() {
  console.log("Selecting all sales employees");
  connection.query(
    "SELECT first_name, last_name, title, salary, name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE ?",
    { name: "Sales" },
    function (err, res) {
      if (err) throw err;
      console.log(
        chalk.green(
          "First Name  |  Last Name  |  Title  |  Salary  |  Department"
        )
      );
      // for loop to display all information selected
      for (var i = 0; i < res.length; i++) {
        console.log(
          chalk.blue(
            res[i].first_name +
              " | " +
              res[i].last_name +
              " | " +
              res[i].title +
              " | " +
              res[i].salary +
              " | " +
              res[i].name
          )
        );
      }
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
        choices: ["View", "Add", "Delete", "Edit"],
      },
    ])
    .then((answers) => {
      if (answers.action === "View") {
        promptView();
      }
    });
}

function init() {
  return console.log(
    chalk.blue(
      figlet.textSync("Employee Tracker", { horizontalLayout: "full" })
    )
  );
}

function promptView() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "view",
        message: "What would you like to view",
        choices: [
          "All Departments",
          "All Roles",
          "All Employees",
          "All Managers",
          "Finance Employees",
          "Engineering Employees",
          "Support Employees",
          "Sales Employees",
        ],
      },
    ])
    .then((answers) => {
      if (answers.view === "All Employees") {
        readEmployees();
      }
      if (answers.view === "All Managers") {
        managers();
      }
      if (answers.view === "Finance Employees") {
        financeEmployees();
      }
      if (answers.view === "Engineering Employees") {
        engineerEmployees();
      }
      if (answers.view === "Support Employees") {
        supportEmployees();
      }
      if (answers.view === "Sales Employees") {
        salesEmployees();
      }
    });
}
