import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProjects, addProject, updateProject, deleteProject } from '../../actions/project';
import styles from './SecondPage.module.css';
import { Modal, Button, Toast } from 'react-bootstrap';

const mapStateToProps = (state) => ({
    //access state variables
    projects: state.project.projects
});

const ObjectId = require('mongoose').Types.ObjectId;

const SecondPage = (props) => {
    const [addProjectData, setAddProjectData] = useState({});
    const [updateProjectData, setUpdateProjectData] = useState({});
    const [deleteProject, setDeleteProject] = useState({});
    const [show, setShow] = useState(false);
    const [type, setType] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        props.getProjects();
    }, [props.getProjects, props]);

    const addData = (e) => {
        setAddProjectData({ ...addProjectData, [e.target.name]: e.target.value });
    };

    const updateData = (e) => {
        setUpdateProjectData({ ...updateProjectData, [e.target.name]: e.target.value });
    };

    const deleteData = (e) => {
        setDeleteProject({ ...deleteProject, [e.target.name]: e.target.value });
    };

    const clearData = () => {
        setAddProjectData({});
        setUpdateProjectData({});
        setDeleteProject({});
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    const insertValidator = (data) => {
        let isValid = true;
        if (data.project_name.length < 5) {
            setShowToast(!showToast);
            setMessage('Numele proiectului trebuie sa aiba o lungime de minimum 5 caractere! ');
            isValid = false;
        } else if (!Date.parse(`${data.start_date}`)) {
            setShowToast(!showToast);
            setMessage('Data de incepere introdusa nu este corecta');
            isValid = false;
        } else if (!Date.parse(`${data.planned_end_date}`)) {
            setShowToast(!showToast);
            setMessage('Data de finalizare introdusa nu este corecta');
            isValid = false;
        } else if (data.description.length < 10) {
            setShowToast(!showToast);
            setMessage('Descrierea trebuie sa aiba o lungime de minimum 10 caractere');
            isValid = false;
        } else if (data.project_code < 5) {
            setShowToast(!showToast);
            isValid = false;
            setMessage('Codul proiectului trebuie sa aiba o lungime minima de 5 caractere');
        }
        return isValid;
    };

    const updateDelValidator = (data) => {
        let isValid = true;
        if (!ObjectId.isValid(data._id)) {
            setMessage('ID-ul este obligatoriu pentru actualizari si stergeri');
            setShowToast(!showToast);
            isValid = false;
        }
        return isValid;
    };

    return (
        <div className={styles.bg}>
            <div className='table-responsive'>
                <table className={`table table-dark ${styles.extraTableCss}`}>
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Nume proiect</th>
                            <th scope='col'>Data de incepere</th>
                            <th scope='col'>Data de incheiere</th>
                            <th scope='col'>Descriere</th>
                            <th scope='col'>Cod proiect</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.projects.length > 0
                            ? props.projects.map((project) => (
                                  <tr key={project._id}>
                                      <td>{project._id}</td>
                                      <td>{project.project_name}</td>
                                      <td>{project.start_date}</td>
                                      <td>{project.planned_end_date}</td>
                                      <td>{project.description}</td>
                                      <td>{project.project_code}</td>
                                  </tr>
                              ))
                            : null}
                    </tbody>
                </table>
                <div className={`container ${styles.containerClass}`}>
                    <button
                        type='button'
                        className='btn btn-secondary'
                        onClick={() => {
                            handleShow();
                            setType('add');
                        }}>
                        Adauga
                    </button>
                    <button
                        type='button'
                        className='btn btn-secondary'
                        onClick={() => {
                            handleShow();
                            setType('update');
                        }}>
                        Actualizeaza
                    </button>
                    <button
                        type='button'
                        className='btn btn-secondary'
                        onClick={() => {
                            handleShow();
                            setType('delete');
                        }}>
                        Sterge
                    </button>
                </div>
                {type === 'add' ? (
                    <Modal show={show} onHide={handleClose} centered>
                        <Modal.Body className={styles.formData}>
                            <label>Nume proiect</label>
                            <input type='text' name='project_name' onChange={addData} placeholder='Numele proiectului' />
                            <label>Data de inceput</label>
                            <input type='text' name='start_date' onChange={addData} placeholder='MM-DD-YYYY' />
                            <label>Data de finalizare</label>
                            <input type='text' name='planned_end_date' onChange={addData} placeholder='MM-DD-YYYY' />
                            <label>Descriere proiect</label>
                            <input type='text' name='description' onChange={addData} placeholder='Descriere proiect' />
                            <label>Cod proiect</label>
                            <input type='text' name='project_code' onChange={addData} placeholder='Codul proiectului' />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='danger' onClick={handleClose}>
                                Inchide
                            </Button>
                            <Button
                                variant='primary'
                                onClick={() => {
                                    handleClose();
                                    if (insertValidator(addProjectData)) props.addProject(addProjectData);
                                    clearData();
                                }}>
                                Adauga
                            </Button>
                        </Modal.Footer>
                    </Modal>
                ) : type === 'update' ? (
                    <Modal show={show} onHide={handleClose} centered>
                        <Modal.Body className={styles.formData}>
                            <label>ID Proiect</label>
                            <input type='text' name='_id' onChange={updateData} placeholder='ID Proiect' />
                            <label>Nume proiect</label>
                            <input type='text' name='project_name' onChange={updateData} placeholder='Numele proiectului' />
                            <label>Data de inceput</label>
                            <input type='text' name='start_date' onChange={updateData} placeholder='MM-DD-YYYY' />
                            <label>Data de finalizare</label>
                            <input type='text' name='planned_end_date' onChange={updateData} placeholder='MM-DD-YYYY' />
                            <label>Descriere proiect</label>
                            <input type='text' name='description' onChange={updateData} placeholder='Descriere proiect' />
                            <label>Cod proiect</label>
                            <input type='text' name='project_code' onChange={updateData} placeholder='Codul proiectului' />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='danger' onClick={handleClose}>
                                Inchide
                            </Button>
                            <Button
                                variant='primary'
                                onClick={() => {
                                    handleClose();
                                    if (updateDelValidator(updateProjectData)) props.updateProject(updateProjectData);
                                    clearData();
                                }}>
                                Actualizeaza
                            </Button>
                        </Modal.Footer>
                    </Modal>
                ) : type === 'delete' ? (
                    <Modal show={show} onHide={handleClose} centered>
                        <Modal.Body className={styles.formData}>
                            <label>ID Proiect</label>
                            <input type='text' name='_id' onChange={deleteData} placeholder='ID-ul proiectului' />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='danger' onClick={handleClose}>
                                Inchide
                            </Button>
                            <Button
                                variant='primary'
                                onClick={() => {
                                    handleClose();
                                    if (updateDelValidator(deleteProject)) props.deleteProject(deleteProject);
                                    clearData();
                                }}>
                                Sterge
                            </Button>
                        </Modal.Footer>
                    </Modal>
                ) : null}
            </div>
            <Toast
                className={styles.toast}
                bg='warning'
                delay='5000'
                autohide={true}
                show={showToast}
                onClose={() => {
                    setShowToast(!showToast);
                }}>
                <Toast.Header>
                    <strong className='me-auto'>Ceva nu a mers bine !</strong>
                </Toast.Header>
                <Toast.Body>
                    Datele introduse nu sunt corecte! <br></br> Motiv: {message}
                </Toast.Body>
            </Toast>
        </div>
    );
};

SecondPage.propTypes = {
    projects: PropTypes.array //declare the data structure of the variable wanted
};

export default connect(mapStateToProps, { getProjects, addProject, updateProject, deleteProject })(SecondPage);
