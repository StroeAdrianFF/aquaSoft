const connectToDB = require('./db.js'); //import our connection from the other file
const express = require('express');
const cors = require('cors'); //allows us to make requests from a website to another
const routes = require('./routes');
const jwt = require('jsonwebtoken');
require('dotenv').config(); //require env file to get secret

const app = express();
app.use(express.json({ extended: false })); //activate body parser */
app.use(cors());
connectToDB(); //connect to db

const port = 5000;

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.tokenData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Session is invalid' });
    }
};

app.get('/', (req, res) => {
    res.send('I was expecting you!');
});

app.get('/ordered', verifyToken, routes.orderedEmployees); //get ordered employees
app.get('/name/:name', routes.firstName); //get employee by name
app.get('/projects', verifyToken, routes.allProjects);

app.get('/emplAndProject', routes.getEmplWithProject);

app.post('/insertEmpl', verifyToken, routes.addEmployee);
app.post('/insertProject', verifyToken, routes.addProject);

app.post('/signUp', routes.signUp);
app.post('/signIn', routes.signIn);

app.put('/updateEmpl/:id', verifyToken, routes.updateEmpl);
app.put('/updateProject/:id', verifyToken, routes.updateProject);

app.delete('/delete/:id', verifyToken, routes.deleteEmpl);
app.delete('/deleteProject/:id', verifyToken, routes.deleteProject);

app.listen(port, () => {
    //run server
    console.log(`Server pornit la portul ${port} `);
});
