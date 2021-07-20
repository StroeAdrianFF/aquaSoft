const {Schema, model} = require('mongoose')

const employeeSchema = new Schema ({//define an employee
    name:{
        type: String
    },
    address:{
        type: String 
    },
    email:{
        type: String
    },
    hire_date:{
        type: Date
    },
    salary:{
        type: Number
    },
    job_title:{
        type: String
    }

})

module.exports = Employee = model('employee',employeeSchema) //export it