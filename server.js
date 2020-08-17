const mysql = require("mysql");
const inquirer = require("inquirer");
const pw = require("./pw");
const chalk = require("chalk");
const figlet = require("figlet");
var departments = [];
var roles = [];
var employees = [];

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
        "\n" +
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
      promptUser();
    }
  );
}

// displays all managers i.e. role.id 1-4
function managers() {
  console.log("Selecting all managers");
  connection.query("SELECT * FROM employee WHERE role_id<5", function (
    err,
    res
  ) {
    if (err) throw err;
    console.log(
      "\n" +
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
    promptUser();
  });
}

// displays all finance employees
function financeEmployees() {
  console.log("Selecting all finance employees");
  connection.query(
    "SELECT first_name, last_name, title, salary, name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE ?",
    { name: "Finance" },
    function (err, res) {
      if (err) throw err;
      console.log(
        "\n" +
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
      promptUser();
    }
  );
}

// displays all engineering employees
function engineerEmployees() {
  console.log("Selecting all engineering employees");
  connection.query(
    "SELECT first_name, last_name, title, salary, name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE ?",
    { name: "Engineering" },
    function (err, res) {
      if (err) throw err;
      console.log(
        "\n" +
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
      promptUser();
    }
  );
}

// displays all support employees
function supportEmployees() {
  console.log("Selecting all support employees");
  connection.query(
    "SELECT first_name, last_name, title, salary, name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE ?",
    { name: "Support" },
    function (err, res) {
      if (err) throw err;
      console.log(
        "\n" +
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
      promptUser();
    }
  );
}

// displays all sales employees
function salesEmployees() {
  console.log("Selecting all sales employees");
  connection.query(
    "SELECT first_name, last_name, title, salary, name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE ?",
    { name: "Sales" },
    function (err, res) {
      if (err) throw err;
      console.log(
        "\n" +
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
      promptUser();
    }
  );
}

// displays the name of all departments
function viewDepartments() {
  console.log("Selecting all Departments");
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.log("\n" + chalk.green("Department Names"));
    // for loop to display all information selected
    for (var i = 0; i < res.length; i++) {
      console.log(chalk.blue(res[i].name));
    }
    promptUser();
  });
}

// displays all the roles
function viewRoles() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.log("\n" + chalk.green("Roles/Titles"));
    // for loop to display all information selected
    for (var i = 0; i < res.length; i++) {
      console.log(chalk.blue(res[i].title));
    }
    promptUser();
  });
}

// prompts user with what they would like to do
function promptUser(answers) {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ["View", "Add", "Delete", "Edit", "Exit"],
      },
    ])
    .then((answers) => {
      if (answers.action === "View") {
        promptView();
      }
      if (answers.action === "Add") {
        promptAdd();
      }
      if (answers.action === "Delete") {
        promptDelete();
      }
      if (answers.action === "Edit") {
        promptEdit();
      }
      if (answers.action === "Exit") {
        endConn();
      }
    });
}

// displays Banner
function init() {
  return console.log(
    chalk.blue(
      figlet.textSync("Employee Tracker", { horizontalLayout: "full" })
    )
  );
}

// prompts user with what they would like to view
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
      if (answers.view === "All Departments") {
        viewDepartments();
      }
      if (answers.view === "All Roles") {
        viewRoles();
      }
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

function addDept(answers) {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "addDept",
        message: "What is the name of your new department?",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT into department SET ?",
        { name: answers.addDept },
        function (err, res) {
          if (err) throw err;
          viewDepartments();
        }
      );
    });
}

function addRole(answers) {
  pushDept();

  return inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the name of the new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of this new role?",
      },
      {
        type: "list",
        name: "deptid",
        message: "Which department will this role work under?",
        choices: departments,
      },
    ])
    .then((answers) => {
      let answer = answers.deptid;
      let index = departments.indexOf(answer) + 1;

      connection.query(
        "INSERT into role SET ?",
        { title: answers.title, salary: answers.salary, department_id: index },
        function (err, res) {
          if (err) throw err;
          viewRoles();
        }
      );
    });
}

function addEmployee(answers) {
  pushRole();
  return inquirer
    .prompt([
      {
        type: "input",
        name: "first",
        message: "What is your new employee's first name?",
      },
      {
        type: "input",
        name: "last",
        message: "What is your new employee's last name?",
      },
      {
        type: "list",
        name: "roleid",
        message: "What is your new employee's role?",
        choices: roles,
      },
    ])
    .then((answers) => {
      let answer = answers.roleid;
      let index = roles.indexOf(answer) + 1;
      console.log(index);

      connection.query(
        "INSERT into employee SET ?",
        { first_name: answers.first, last_name: answers.last, role_id: index },
        function (err, res) {
          if (err) throw err;
          readEmployees();
        }
      );
    });
}

// prompts user with what they would like to add
function promptAdd() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "add",
        message: "What would you like to add",
        choices: ["Add Department", "Add Role", "Add Employee"],
      },
    ])
    .then((answers) => {
      if (answers.add === "Add Department") {
        addDept();
      }
      if (answers.add === "Add Role") {
        addRole();
      }
      if (answers.add === "Add Employee") {
        addEmployee();
      }
    });
}

function deleteDept() {
  // pushDept();
  // return inquirer
  //   .prompt([
  //     {
  //       type: "list",
  //       name: "dept",
  //       message: "What department would you like to delete?",
  //       choices: departments,
  //     },
  //   ])
  //   .then((answers) => {
  // connection.query(
  // "DELETE FROM department WHERE ?",
  // {
  //   name: answers.dept,
  // },
  // function (err, res) {
  //   if (err) throw err;
  // }
  connection.query(
    "DELETE FROM department WHERE ?",
    {
      name: "Channa's Department",
    },
    function (err, res) {
      if (err) throw err;
    }
  );
  viewDepartments();
  // });
}

function deleteRole() {
  // pushRole();
  // return inquirer
  //   .prompt([
  //     {
  //       type: "list",
  //       name: "role",
  //       message: "What role would you like to delete?",
  //       choices: roles,
  //     },
  //   ])
  //   .then((answers) => {
  //     connection.query(
  //       "DELETE FROM role WHERE ?",
  //       {
  //         title: answers.role,
  //       },
  //       function (err, res) {
  //         if (err) throw err;
  //       }

  connection.query(
    "DELETE FROM role WHERE ?",
    {
      title: "Channa's Position",
    },
    function (err, res) {
      if (err) throw err;
    }
  );
  viewRoles();
  // });
}

function deleteEmployee() {
  // pushEmployee();
  // return inquirer
  //   .prompt([
  //     {
  //       type: "list",
  //       name: "employee",
  //       message: "Which employee would you like to delete?",
  //       choices: employees,
  //     },
  //   ])
  //   .then((answers) => {
  //     connection.query(
  //       "DELETE FROM employee WHERE ?",
  //       {
  //         first_name: answers.role,
  //       },
  //       function (err, res) {
  //         if (err) throw err;
  //       }
  //     );
  connection.query(
    "DELETE FROM employee WHERE ? AND WHERE ?",
    {
      first_name: "Channa",
    },
    {
      last_name: "Mik",
    },

    function (err, res) {
      if (err) throw err;
    }
  );
  readEmployees();
  // });
}

// prompts user with what they would like to delete
function promptDelete() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "delete",
        message: "What would you like to delete",
        choices: ["Delete Department", "Delete Role", "Delete Employee"],
      },
    ])
    .then((answers) => {
      if (answers.delete === "Delete Department") {
        deleteDept();
      }
      if (answers.delete === "Delete Role") {
        deleteRole();
      }
      if (answers.delete === "Delete Employee") {
        deleteEmployee();
      }
    });
}

function pushDept() {
  departments = [];
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    // for loop to stringify dept names
    for (var i = 0; i < res.length; i++) {
      var deptName = res[i].name;
      departments.push(deptName);
    }
    console.log("push to departments successful!");
  });
}

function pushRole() {
  roles = [];
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    // for loop to stringify dept names
    for (var i = 0; i < res.length; i++) {
      var roleName = res[i].title;
      roles.push(roleName);
    }
  });
}

function pushEmployee() {
  employees = [];
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    // for loop to stringify dept names
    for (var i = 0; i < res.length; i++) {
      var name = res[i].first_name + res[i].last_name;
      employees.push(name);
    }
    console.log("push to employees successful!");
  });
}

// prompts user with what they would like to edit
function promptEdit() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "edit",
        message: "What would you like to edit",
        choices: ["Edit Departments", "Edit Roles", "Edit Employees"],
      },
    ])
    .then((answers) => {
      if (answers.edit === "Edit Departments") {
        editDept();
      }
      if (answers.view === "Edit Roles") {
      }
      if (answers.view === "Edit Employees") {
      }
    });
}

function editDept() {
  // pushDept();
  return inquirer
    .prompt([
      // {
      //   type: "list",
      //   name: "dept",
      //   message: "What department would you like to edit?",
      //   choices: departments,
      // },
      {
        type: "input",
        name: "deptName",
        message: "What would you like to change the department name to?",
      },
    ])
    .then((answers) => {
      // let answer = answers.dept;
      // let index = departments.indexOf(answer) + 1;

      connection.query(
        "UPDATE department SET ? WHERE ?",
        [
          {
            name: answers.deptName,
          },
          { id: 5 },
        ],
        function (err, res) {
          if (err) throw err;
        }
      );
      viewDepartments();
    });
}

// ends connection
function endConn() {
  connection.end();
}
