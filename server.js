const mysql = require('mysql2');
const db = mysql.createConnection('mysql://root:chickenrecipe123@localhost:3306/employeetr_db');
const inquirer = require('inquirer');



const question = () => {
inquirer.prompt([{
  message: 'what would you like to do',
  type: 'list',
  choices: ['add department', 'add role', 'add employee', 'view departments', 'view roles', 'view employees', 'update employee', 'nada'],
  name: 'choice'
}])
.then(initial => {
  console.log(initial)
  console.log(initial.choice)
  switch(initial.choice) {
    case 'add department':
    addDepartment()
    break
    case 'add role':
    addRole()
    break
    case 'add employee':
    addEmployee()
    break
    case 'view departments':
    viewDepartments()
    break
    case 'view roles':
    viewRoles()
    break
    case 'view employees':
    viewEmployees()
    break
    case 'update employee':
    updateEmployee()
    break
    case 'nada':
    console.log('nothingness...')
    break
  }
})
}

const addEmployee = () => {
  console.log('employee addition attempt!')
  inquirer.prompt([{
    message: 'what employee first name are you adding',
    type: 'input',
    name: 'firstname'
  },
  {
    message: 'what employee last name are you adding',
    type: 'input',
    name: 'lastname'
  },
  {
    message: 'what is the role ID',
    type: 'input',
    name: 'role_id'
  },
  {
    message: 'is the employee a manager',
    type: 'list',
    choices: ['yes', 'no'],
    name: 'managerBoolean'
  }
  ])
  .then(employee => {
    console.log(employee)
    if(employee.managerBoolean === 'yes') {
      console.log('MANAGER addition attempt!')
      delete employee.managerBoolean
      console.log(employee)
      db.query('INSERT INTO employees SET ?', employee, err => {
        if (err) { console.log(err) }
      })
      console.log('manager now added!')
      question()
    }

    else if(employee.managerBoolean === 'no') {
      console.log('nonMANAGER addition attempt!')
      inquirer.prompt([{
        message: 'what is the id of the manager of employee',
        type: 'input',
        name: 'manager_id'
      }])
      .then(nonmanager => {
        console.log(employee)
        console.log(nonmanager)

        delete employee.managerBoolean
        let newEmployee = {
          ...employee,
          ...nonmanager
        }
        db.query('INSERT INTO employees SET ?', newEmployee, err => {
          if (err) { console.log(err) }
        })
        console.log('nonmanager now added!')
        question()
        })
    }
  })
}

const viewEmployees = () => {
  db.query('SELECT * FROM employees', (err, employees) => {
    if(err) {
      console.log(err)
    }
    console.table(employees)
  })
  question()
}

const addRole = () => {
  console.log('role addition attempt!')
  inquirer.prompt([{
    message: 'what role title are you adding',
    type: 'input',
    name: 'title'
  },
  {
    message: 'what is the salary for the role',
    type: 'input',
    name: 'salary'
  },
  {
    message: 'what is the department ID',
    type: 'input',
    name: 'department_id'
  }
])
.then(role => {
  console.log(role)
    db.query('INSERT INTO roles SET ?', role, err =>{
      if(err) {console.log(err)}
    })
    console.log('role now added!')
    question()
  })
}

const viewRoles = () => {
  db.query('SELECT * FROM roles', (err, roles) => {
    if(err) {
      console.log(err)
    }
    console.table(roles)
  })
  question()
}

const updateRole = () =>{
  inquirer.prompt([{
    message: 'what is the id of the employee you want to update',
    type: 'input',
    name: 'id'
  },
  {
    message: 'what is the id of the role that the employee should be updated to',
    type: 'input',
    name: 'role_id'
  }
  ])
  .then(employee =>{
    let newRole = {
      role_id: employee.role_id
    }
    db.query(`UPDATE employees SET ? WHERE id = ${employee.id}`, newRole, err => {
      if (err) { console.log(err) }
    })
    console.log('employee updated')
    question()
  })
}

const addDepartment = () => {
  console.log('department addition attempt!')
  inquirer.prompt([{
    message: 'what department are you adding',
    type: 'input',
    name: 'name'
  }])
  .then(department => {
    console.log(department)
    db.query('INSERT INTO departments SET ?', department, err =>{
      if(err) {console.log(err)}
    })
    console.log('department now added!')
    question()
  })
}

const viewDepartments = () => {
  db.query('SELECT * FROM departments', (err, departments) => {
    if(err) {
      console.log(err)
    }
    console.table(departments)
  })
  question()
}


question()



