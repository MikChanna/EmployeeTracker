-- Create the database employee tracker
CREATE DATABASE employee_tracker;
USE employee_tracker;
-- Create the table actors.
CREATE TABLE department (
  id int AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);
CREATE TABLE role (
  id int AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY(id)
);
CREATE TABLE employee (
  id int AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY(id)
);
-- Insert a set of records for department.
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Support");
INSERT INTO department (name) VALUES ("Sales");

-- Insert a set of records for role.
INSERT INTO role (title, salary, department_id) VALUES ("Finance Manager", 80000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Engineering Manager", 85000.00,2);
INSERT INTO role (title, salary, department_id) VALUES ("Support Manager", 80000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Manager", 80000.00, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Controller", 64000.00,1);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 60000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Senior Software Engineer", 71000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Junior Software Engineer", 65000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Customer Support", 45000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Senior Customer Support", 50000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Specialist", 45000.00, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Account Executive", 60000.00, 4);

-- Insert a set of records for employee.
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Julie", "Rogers", 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Scott", "Ryan", 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Lionel", "Thomas", 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Kyle", "Moore", 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Lindsey", "Skye", 5);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Jonathon", "San", 7);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Jermaine", "Jones", 9);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Shari", "Desai", 11);

