const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: 'root',
    // Be sure to update with your own MySQL password!
    password: 'rootroot',
    database: 'employeetracker',
});

connection.connect();

inquirer.prompt([
    {
        type: "list",
        name: "first_option",
        message: "What would you like to do? ",
        choices: ['View All Departments',
            'Add Department',
            'Remove Department',
            'Update Department'
        ]
    },
]).then((answer) => {
    if (answer.first_option === "Add Department") {
        inquirer.prompt([
            {
                type: "input",
                name: "departmentName",
                message: `What is the departments name?`
            }]).then((answers) => {
                let query = 'insert into employeetracker.department (department_name) values (?);'
                console.log(query);
                connection.query(query, [answers.departmentName]);
            })
    } else if (answer.first_option === "View All Departments") {
        let query = 'select * from employeetracker.department;'
        connection.query(query, function (err, result) {
            if (err) throw err;
            console.log("Result: " + result);
            console.table(result);
        });
    } else if (answer.first_option === "Remove Department") {
        let query = 'select * from employeetracker.department;'
        connection.query(query, function (err, result) {
            if (err) throw err;
            console.log("Result: " + result);
            console.table(result);
        });
        inquirer.prompt([
            {
                type: "input",
                name: "departmentId",
                message: `What department id do you want to delete?`
            }]).then((answers) => {
                let query = 'delete from employeetracker.department where department_id = ?;'
                console.log(query);
                connection.query(query, [answers.departmentId]);
            })
    }
    
else if (answer.first_option === "Update Department") {
    let query = 'select * from employeetracker.department;'
    connection.query(query, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
        console.table(result);
    });
    inquirer.prompt([
        {
            type: "input",
            name: "departmentId",
            message: `What department ID do you want to change?`
        }
        ,
        {
            type: "input",
            name: "departmentName",
            message: `What is your new department name?`
        }
    ]).then((answers) => {
            let query = 'update employeetracker.department set department_name = ? where department_id = ?;'
            console.log(query);
            connection.query(query, [answers.departmentName, answers.departmentId]);
        })}
});
