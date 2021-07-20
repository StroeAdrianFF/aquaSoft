const Employee = require('./models/employee.js')//import model


const orderedEmployees =  async (req,res)=> {
    try {
        const ordered = await Employee.find({}).sort({salary: -1}) //descending order
        res.json(ordered)
    } catch (error) {
        console.log(`Hopa! Ceva nu merge bine la ordonare: ${error}`)
        return res.json({message: 'Error on retrieving'})
    }
}


const emails = async (req,res) =>{
    try {
        const emails = await Employee.find({email: {$regex:".*@gmail.*"}}) //find employee with gmail address
        res.json(emails)
    } catch (error) {
        console.log(`Hopa! Ceva nu merge bine la emailuri: ${error}`)
        return res.json({message: 'Error on retrieving'})
    }
}


exports.orderedEmployees = orderedEmployees
exports.emails = emails