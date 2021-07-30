const Employee = require('./models/employee.js'); //import model
const Project = require('./models/project.js');
const User = require('./models/user.js');

const MongoClient = require('mongodb').MongoClient;
const URI = 'mongodb+srv://adrian:adrian@cluster0.2gzfu.mongodb.net/internship?retryWrites=true&w=majority';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    try {
        //salt passwords
        const saltPass = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, saltPass); //hash password
        const userName = await User.findOne({ username: req.body.username });

        const signedUpUser = new User({
            username: req.body.username,
            password: securePass, //set password to hashed password
            job: req.body.job
        });

        if (userName !== null) {
            //if user exists => error
            return res.status(400).json({ error: 'Un user cu numele respectiv deja exista' });
        } else {
            await signedUpUser.save(); //save user in db

            const token = jwt.sign({ username: signedUpUser.username, password: signedUpUser.password }, 'secret', {
                expiresIn: '1h'
            });
            return res.status(200).json({ token });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
};

const signIn = async (req, res) => {
    try {
        const findByUsername = await User.findOne({ username: req.body.username });
        if (findByUsername == null) {
            return res.status(400).json({ error: 'Username incorect!' }); //send message to frontend like this
        }
        if (await bcrypt.compare(req.body.password, findByUsername.password)) {
            const token = jwt.sign({ username: findByUsername.username, password: findByUsername.password }, 'secret', {
                expiresIn: '1h'
            }); //secret will go in .env file later
            return res.status(200).json({ token }); //if password is ok send succes
        } else {
            return res.status(403).send('Interzis'); //else send forbidden
        }
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

const orderedEmployees = async (req, res) => {
    try {
        const ordered = await Employee.find({}).sort({ salary: -1 }); //sort every employee by their descending salary
        return res.json(ordered);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

const firstName = async (req, res) => {
    try {
        const firstName = await Employee.findOne({ name: `${req.params.name}` }); //find 1 employee by name
        return res.json(firstName);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

const allProjects = async (req, res) => {
    try {
        const projects = await Project.find({});
        return res.json(projects);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

const getEmplWithProject = async (req, res) => {
    const client = new MongoClient(URI, { useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db();
        const result = await db
            .collection('employees')
            .aggregate([
                {
                    $lookup: {
                        from: 'projects',
                        localField: 'project_id',
                        foreignField: '_id',
                        as: 'proiecte_angajat'
                    }
                }
            ])
            .toArray();
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
    client.close();
};
//poti returna si statusul la return

const addEmployee = async (req, res) => {
    try {
        const newEmpl = new Employee({
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            hire_date: Date.parse(req.body.hire_date),
            salary: req.body.salary,
            job_title: req.body.job_title
        }).save();
        return res.json(newEmpl);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

const addProject = async (req, res) => {
    try {
        const newProject = new Project({
            project_name: req.body.project_name,
            start_date: Date.parse(req.body.start_date),
            planned_end_date: Date.parse(req.body.planned_end_date),
            description: req.body.description,
            project_code: req.body.project_code
        }).save();
        return res.json(newProject);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

const updateEmpl = async (req, res) => {
    try {
        const empl = await Employee.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) }, req.body); //so we can do the deletion from frontend
        return res.json(empl);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

const updateProject = async (req, res) => {
    try {
        const project = await Project.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) }, req.body);
        return res.json(project);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

const deleteEmpl = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        return res.json({ message: 'Angajat sters!' });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

const deleteProject = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        return res.json({ message: 'Proiect sters!' });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

exports.orderedEmployees = orderedEmployees;
exports.firstName = firstName;
exports.addEmployee = addEmployee;
exports.updateEmpl = updateEmpl;
exports.deleteEmpl = deleteEmpl;

exports.allProjects = allProjects;
exports.addProject = addProject;
exports.updateProject = updateProject;
exports.deleteProject = deleteProject;

exports.getEmplWithProject = getEmplWithProject;

exports.signUp = signUp;
exports.signIn = signIn;
