
create schema employeetracker;

create table employeetracker.department (
department_id INT PRIMARY KEY AUTO_INCREMENT,
department_name VARCHAR(30) not null
);

create table employeetracker.role (
role_id INT PRIMARY KEY AUTO_INCREMENT,
role_title VARCHAR(30) not null,
role_salary DECIMAL not null,
role_department_id INT not null,  
  CONSTRAINT fk_role_department FOREIGN KEY (role_department_id)  
  REFERENCES employeetracker.department(department_id)  
  ON DELETE CASCADE  
  ON UPDATE CASCADE  
);

create table employeetracker.employee (
employee_id INT PRIMARY KEY AUTO_INCREMENT,
employee_first_name VARCHAR(30) not null,
employee_last_name VARCHAR(30) not null,
employee_role_id INT not null, 
employee_manager_id INT,
CONSTRAINT fk_employee_role FOREIGN KEY (employee_role_id)  
  REFERENCES employeetracker.role(role_id)  
  ON DELETE CASCADE  
  ON UPDATE CASCADE,
CONSTRAINT fk_employee_manager FOREIGN KEY (employee_manager_id)  
  REFERENCES employeetracker.employee(employee_id)  
  ON UPDATE CASCADE
);
