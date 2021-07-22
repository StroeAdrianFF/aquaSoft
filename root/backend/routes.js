const Employee = require('./models/employee.js')//import model
const Project = require('./models/project.js')

const MongoClient = require('mongodb').MongoClient
const URI = 'mongodb+srv://adrian:adrian@cluster0.2gzfu.mongodb.net/internship?retryWrites=true&w=majority' 

const orderedEmployees =  async (req,res)=> {
    try {
        const ordered = await Employee.find({}).sort({salary: -1}) //sort every employee by their descending salary
        res.json(ordered)
    } catch (error) {
        console.log(`Hopa! Ceva nu merge bine la ordonare: ${error}`)
        return res.json({message: 'Error on retrieving'})
    }
}


const firstName = async (req,res) =>{
    try {
        const firstName = await Employee.findOne({name: `${req.params.name}`}) //find 1 employee by name
        res.json(firstName)
    } catch (error) {
        console.log(`Hopa! Ceva nu merge bine la nume: ${error}`)
        return res.json({message: 'Error on retrieving'})
    }
}


const allProjects = async (req,res)=>{
    try {
        const projects = await Project.find({})
        res.json(projects)
    } catch (error) {
        console.log(`Proiectele nu au putut fi gasite: ${error}`)
        return res.json({message: 'Error on returning projects'})
    }
}


const getEmplWithProject = async (req,res)=>{

    const client = new MongoClient(URI)

    try {
        await client.connect()
        const db = client.db()
        const result = await db.collection('employees').aggregate([
            {
        $lookup:{
            from: "projects",
            localField: "project_id",
            foreignField: "_id",
            as: "proiecte_angajat"
        }
    }
]).toArray()
        res.json(result)
    } catch (error) {
        console.log(`Proiectele nu au putut fi gasite: ${error}`)
        return res.json({message: 'Error on returning projects for employee'})
    }
  client.close()
}




const addEmployee = async (req, res) =>{
    try {
      const newEmpl =  new Employee({
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            hire_date: req.body.hire_date,
            salary: req.body.salary,
            job_title: req.body.job_title
    }).save()
    res.json(newEmpl)
    } catch (error) {
        console.log(`Hopa! Ceva nu merge bine la inserare: ${error}`)
        return res.json({message: 'Error on insertion'})
    }
}


const addProject = async (req,res) =>{
    try {
        const newProject = new Project({
            project_name: req.body.project_name,
            start_date: req.body.start_date,
            planned_end_date: req.body.planned_end_date,
            description: req.body.description,
            project_code: req.body.project_code
        }).save()
        res.json(newProject)
    } catch (error) {
        console.log(`Nu s-a putut insera un proiect nou. ${error}`)
        return res.json({message: 'Unable to insert new project'})
    }
}





const updateEmpl = async (req,res) => {
    try {
        const empl = await Employee.updateOne({_id:req.params.id}, req.body)
        res.json(empl)
    } catch (error) {
    console.log(`Hopa! Ceva nu merge bine la update: ${error}`)
    return res.json({message: 'Error on updating'})
   }
}

const updateProject = async (req,res)=>{
    try {
        const project = await Project.updateOne({_id: req.params.id}, req.body)
        res.json(project)
    } catch (error) {
        console.log(`Nu s-a putut actualiza un proiect. ${error}`)
        return res.json({message: 'Unable to update project'})
    }
}






const deleteEmpl = async (req,res)=>{
    try {
        await Employee.findByIdAndDelete(req.params.id)
        res.json({message: 'Angajat sters!'})
    } catch (error) {
        console.log(`Hopa! Ceva nu merge bine la delete: ${error}`)
        return res.json({message: 'Error on deletion'})
    }
}


const deleteProject = async (req, res)=>{
    try {
        await Project.findByIdAndDelete(req.params.id)
        res.json({message: 'Proiect sters!'})
    } catch (error) {
        console.log(`Nu s-a putut sterge proiectul. ${error}`)
        return res.json({message: 'Unable to delete project'})
    }
}


exports.orderedEmployees = orderedEmployees
exports.firstName = firstName
exports.addEmployee = addEmployee
exports.updateEmpl = updateEmpl
exports.deleteEmpl = deleteEmpl

exports.allProjects = allProjects
exports.addProject = addProject
exports.updateProject = updateProject
exports.deleteProject = deleteProject

exports.getEmplWithProject = getEmplWithProject