const connectToDB = require('./db.js'); //import our connection from the other file
const express = require('express');
const cors = require('cors'); //allows us to make requests from a website to another
const routes = require('./routes');

const app = express();
app.use(express.json({ extended: false })); //activate body parser */
app.use(cors());
connectToDB(); //connect to db

const port = 5000;

app.get('/', (req, res) => {
    res.send('I was expecting you!');
});

app.get('/ordered', routes.orderedEmployees); //get ordered employees
app.get('/name/:name', routes.firstName); //get employee by name
app.get('/projects', routes.allProjects);

app.get('/emplAndProject', routes.getEmplWithProject);

app.post('/insertEmpl', routes.addEmployee);
app.post('/insertProject', routes.addProject);

app.post('/signUp', routes.signUp);
app.post('/signIn', routes.signIn);

app.put('/updateEmpl/:id', routes.updateEmpl);
app.put('/updateProject/:id', routes.updateProject);

app.delete('/delete/:id', routes.deleteEmpl);
app.delete('/deleteProject/:id', routes.deleteProject);

app.listen(port, () => {
    //run server
    console.log(`Server pornit la portul ${port} `);
});
