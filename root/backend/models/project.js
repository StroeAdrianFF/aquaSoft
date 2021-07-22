const {Schema, model} = require('mongoose')

const projectSchema = new Schema({
    project_name:{
        type: String,
        required: true
    },
    start_date:{
        type: Date,
        required: true
    },
    planned_end_date:{
        type:Date,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    project_code:{
        type: String,
        required: true
    }
})

module.exports = Project = model('project',projectSchema)