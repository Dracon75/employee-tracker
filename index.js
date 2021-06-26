const connection = require("./connection");
const inquirer = require("inquirer");
//const mysql = require("mysql");
const cTable = require("console.table");

function loadQuestions() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "What do you want to do?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee Role",
          "Quit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case "View All Employees":
          viewEmployees();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Quit":
          Quit();
          break;
      }
    });
}

loadQuestions();

function Quit() {
  return;
}

function viewEmployees() {
  let employeesEl =
    "SELECT employee.first_name, employee.last_name, employeeRole.title FROM employee, employeeRole WHERE employee.id = employeeRole.id;";
  connection.query(employeesEl, function (err, res) {
    console.table(res);
    loadQuestions();
  });
}

function viewDepartments() {
  let departmentsEl =
    "SELECT department.name, department.id FROM department ORDER BY id asc";
  connection.query(departmentsEl, function (err, res) {
    console.table(res);
    loadQuestions();
  });
}

function viewRoles() {
  let roles =
    "SELECT employeeRole.title, employeeRole.salary, department.name FROM employeeRole, department WHERE department.id = employeeRole.department_id;";
  connection.query(roles, function (err, res) {
    console.table(res);
    loadQuestions();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is employee's last name?",
      },
      {
        name: "role_ID",
        type: "input",
        message: "What is employee's role ID?",
      },
      {
        name: "managerID",
        type: "input",
        message: "What is your manager ID?",
      },
    ])
    .then(function (answer) {
      let addEmployees =
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
      connection.query(
        addEmployees,
        [answer.firstName, answer.lastName, answer.role_id, answer.managerID],
        function (err, res) {
          if (err) throw err;
          console.log(
            `Successfully Added Employee: ${answer.firstName} ${answer.lastName}`
          );
          loadQuestions();
        }
      );
    });
};

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Please enter a department name.",
      },
      {
        name: "id",
        type: "input",
        message: "Please give your new department an id.",
      },
    ])
    .then(function (answer) {
      let addDepartments = "INSERT INTO department (name, id) VALUES (?, ?)";
      connection.query(
        addDepartments,
        [answer.name, answer.id],
        function (err, res) {
          if (err) throw err;
          console.log(
            `Successfully Added Department: ${answer.name} ${answer.id}`
          );
          loadQuestions();
        }
      );
    });
};

function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Enter a role title.",
      },
      {
        name: "salary",
        type: "input",
        message: "Enter the roles typical annual salary.",
      },
      {
        name: "id",
        type: "input",
        message: "What is the roles id?",
      },
      {
        name: "department_id",
        type: "input",
        message: "What is the department id associated with this role?",
      },
    ])
    .then(function (answer) {
      let addEmployeeRoles =
        "INSERT INTO employeeRole (title, salary, id, department_id) VALUES (?, ?, ?, ?)";
      connection.query(
        addEmployeeRoles,
        [answer.title, answer.salary, answer.id, answer.department_id],
        function (err, res) {
          if (err) throw err;
          console.log(
            `Successfully Added Role: ${answer.title} ${answer.salary} ${answer.id} ${answer.department_id}`
          );
          loadQuestions();
        }
      );
    });
};

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        name: "currentEmployeeId",
        type: "input",
        message: "please enter the id of employee to be edited.",
      },
      {
        name: "newtitle",
        type: "input",
        message: "Enter a new role title.",
      },
      {
        name: "newsalary",
        type: "input",
        message: "Enter role salary.",
      },
      {
        name: "newid",
        type: "input",
        message: "Enter role id.",
      },
      {
        name: "new_deptid",
        type: "list",
        message:
          "Select Department 1.Tourism 2.Forestry 3.Environmental Science 4.Parks and Rec.",
        choices: [1, 2, 3, 4],
      },
    ])
    .then(function (answer) {
      let updateEmployeeRoles =
        "UPDATE employeeRole SET title = ?,  salary = ?, department_id = ? WHERE id = ?";
      connection.query(
        updateEmployeeRoles,
        [answer.newtitle, answer.newsalary, answer.newid, answer.new_deptid],
        function (err, res) {
          if (err) throw err;
          console.log(
            `Successfully Updated Employee Role: ${answer.title} ${answer.salary}`
          );
          loadQuestions();
        }
      );
    });
}
