const connectToDB = require('./db.js') //import our connection from the other file
const express = require('express')
const cors = require('cors') //allows us to make requests from a website to another

const app = express()


/* app.use(express.json({extended: false}))//activate body parser */
app.use(cors());
connectToDB();

const port = process.env.port || 5000

app.get('/', (req,res)=>{
    res.send('I was expecting you!')
})





app.listen(port, ()=>{
    console.log(`Server pornit la portul ${port} `)
})