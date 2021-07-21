const Employee = require('./models/employee.js')//import model


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

const updateEmpl = async (req,res) => {
    try {
        const id = req.params.id
        const empl = await Employee.findById(id)
        empl.salary = req.body.salary
        empl.save()
        res.json(empl)
    } catch (error) {
    console.log(`Hopa! Ceva nu merge bine la update: ${error}`)
    return res.json({message: 'Error on updating'})
   }
}

const deleteEmpl = async (req,res)=>{
    try {
    const id = req.params.id
    await Employee.findByIdAndDelete(id)
    return res.json({message: 'A mers!'})
    } catch (error) {
        console.log(`Hopa! Ceva nu merge bine la delete: ${error}`)
        return res.json({message: 'Error on deletion'})
    }
}


exports.orderedEmployees = orderedEmployees
exports.firstName = firstName
exports.addEmployee = addEmployee
exports.updateEmpl = updateEmpl
exports.deleteEmpl = deleteEmpl