CREATE DATABASE employeeTR_db;

USE employeeTR_db;
CREATE TABLE departments(
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
    );
    
USE employeeTR_db;
CREATE TABLE roles(
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments (id)
    );

USE employeeTR_db;
CREATE TABLE employees(
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(40) NOT NULL,
    lastname VARCHAR(40) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles (id),
    FOREIGN KEY (manager_id) REFERENCES employees (id)
    );