const mongoose = require('mongoose')
const URI = 'mongodb+srv://adrian:adrian@cluster0.2gzfu.mongodb.net/internship?retryWrites=true&w=majority' //uri to connect to db

const connection = async () =>{
    try {
        await mongoose.connect(URI, {//connecting process
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('Suntem conectati!')
    } catch (error) {
        console.log(`Eroare: ${error}`) //print error if error
        process.exit(1)
    }
}


module.exports = connection