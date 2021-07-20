const connectToDB = require('./db.js') //import our connection from the other file
const express = require('express')
const cors = require('cors') //allows us to make requests from a website to another
const routes = require('./routes')
const app = express()


app.use(express.json({extended: false}))//activate body parser */
app.use(cors());
connectToDB();//connect to db

const port = process.env.port || 5000

app.get('/', (req,res)=>{
    res.send('I was expecting you!')
})

app.get('/ordered', routes.orderedEmployees ) //get ordered employees
app.get('/emails', routes.emails)

app.listen(port, ()=>{//run server
    console.log(`Server pornit la portul ${port} `)
})