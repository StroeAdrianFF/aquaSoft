const {Schema, model} = require('mongoose')

const employeeSchema = new Schema ({//define an employee
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true 
    },
    email:{
        type: String,
        required: true
    },
    hire_date:{
        type: Date,
        required: true
    },
    salary:{
        type: Number,
        required: true
    },
    job_title:{
        type: String,
        required: true
    },
    project_id:{
        type: Schema.ObjectId,
        required: false
    }

})

module.exports = Employee = model('employee',employeeSchema) //export it