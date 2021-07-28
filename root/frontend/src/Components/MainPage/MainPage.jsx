import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from '../../actions/employee';
import styles from './MainPage.module.css';
import { Modal, Button, Toast } from 'react-bootstrap';

const mapStateToProps = (state) => ({
    employees: state.employee.employees //access state variables
});

const ObjectId = require('mongoose').Types.ObjectId;

const MainPage = (props) => {
    const [addEmplData, setAddEmplData] = useState({});
    const [emplUpdateData, setEmplUpdateData] = useState({});
    const [emplDelete, setEmplDelete] = useState({});
    const [show, setShow] = useState(false);
    const [type, setType] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        props.getEmployees();
    }, [props.getEmployees, props]);

    const addData = (e) => {
        setAddEmplData({ ...addEmplData, [e.target.name]: e.target.value });
    };
    const updateData = (e) => {
        setEmplUpdateData({
            ...emplUpdateData,
            [e.target.name]: e.target.value
        });
    };
    const deleteData = (e) => {
        setEmplDelete({ ...emplDelete, [e.target.name]: e.target.value });
    };

    const clearData = () => {
        setEmplDelete({});
        setEmplUpdateData({});
        setAddEmplData({});
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    const insertValidator = (data) => {
        let isValid = true;
        if (data?.name?.length < 3) {
            setShowToast(!showToast);
            setMessage('Numele trebuie sa contina minimum 3 caractere');
            isValid = false;
        } else if (data?.address?.length < 5) {
            setShowToast(!showToast);
            setMessage('Adresa trebuie sa contina minimum 5');
            isValid = false;
        } else if (data?.email?.length < 8 || !data?.email?.includes('@') || !data?.email?.includes('.')) {
            setShowToast(!showToast);
            setMessage(`Email-ul trebuie sa contina minimum 8 caractere si sa aiba in compozitie '@' si '.'`);
            isValid = false;
        } else if (!Date.parse(`${data?.hire_date}`)) {
            setShowToast(!showToast);
            setMessage('Data nu are formatul corect');
            isValid = false;
        } else if (isNaN(data?.salary)) {
            setShowToast(!showToast);
            isValid = false;
            setMessage('Salariul nu este un numar');
        } else if (data?.job_title?.length < 3) {
            setShowToast(!showToast);
            isValid = false;
            setMessage('Titlul job-ului trebuie sa contina minimum 3 caractere');
        }
        console.log(data);
        return isValid;
    };

    const updateDelValidator = (data) => {
        let isValid = true;
        if (!ObjectId.isValid(data._id)) {
            setMessage('Te rog completeaza ID-ul intr-un mod corespunzator!');
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
                            <th scope='col'>Nume</th>
                            <th scope='col'>Adresă</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Data Angajării</th>
                            <th scope='col'>Salariu</th>
                            <th scope='col'>Titlu Job</th>
                            <th scope='col'>ID Proiect</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.employees.length > 0
                            ? props.employees.map((employee) => (
                                  <tr key={employee._id}>
                                      <td>{employee._id}</td>
                                      <td>{employee.name}</td>
                                      <td>{employee.address}</td>
                                      <td>{employee.email}</td>
                                      <td>{employee.hire_date}</td>
                                      <td>{employee.salary}</td>
                                      <td>{employee.job_title}</td>
                                      <td>{employee.project_id}</td>
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
                            <label>Nume </label>
                            <input type='text' name='name' onChange={addData} placeholder='Nume angajat' />
                            <label>Adresa</label>
                            <input type='text' name='address' onChange={addData} placeholder='Adresa' />
                            <label>Email</label>
                            <input type='text' name='email' onChange={addData} placeholder='Email' />
                            <label>Data angajare</label>
                            <input type='text' name='hire_date' onChange={addData} placeholder='MM-DD-YYYY' minLength={7} />
                            <label>Salariu</label>
                            <input type='text' name='salary' onChange={addData} placeholder='Salariu' />
                            <label>Titlu job</label>
                            <input type='text' name='job_title' onChange={addData} placeholder='Titlul job-ului' />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='danger' onClick={handleClose}>
                                Inchide
                            </Button>
                            <Button
                                variant='primary'
                                onClick={() => {
                                    handleClose();
                                    if (insertValidator(addEmplData)) props.addEmployee(addEmplData);
                                    clearData();
                                }}>
                                Adauga
                            </Button>
                        </Modal.Footer>
                    </Modal>
                ) : type === 'update' ? (
                    <Modal show={show} onHide={handleClose} centered>
                        <Modal.Body className={styles.formData}>
                            <label>ID Angajat</label>
                            <input type='text' name='_id' onChange={updateData} placeholder='ID Angajat' />
                            <label>Nume</label>
                            <input type='text' name='name' onChange={updateData} placeholder='Nume angajat' />
                            <label>Adresa</label>
                            <input type='text' name='address' onChange={updateData} placeholder='Adresa' />
                            <label>Email</label>
                            <input type='text' name='email' onChange={updateData} placeholder='Email' />
                            <label>Data angajare</label>
                            <input type='text' name='hire_date' onChange={updateData} placeholder='MM-DD-YYYY' />
                            <label>Salariu</label>
                            <input type='text' name='salary' onChange={updateData} placeholder='Salariu' />
                            <label>Titlu job</label>
                            <input type='text' name='job_title' onChange={updateData} placeholder='Titlul job-ului' />
                            <label>ID Proiect</label>
                            <input type='text' name='project_id' onChange={updateData} placeholder='ID-ul proiectului' />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='danger' onClick={handleClose}>
                                Inchide
                            </Button>
                            <Button
                                variant='primary'
                                onClick={() => {
                                    handleClose();
                                    if (updateDelValidator(emplUpdateData)) props.updateEmployee(emplUpdateData);
                                    clearData();
                                }}>
                                Actualizeaza
                            </Button>
                        </Modal.Footer>
                    </Modal>
                ) : type === 'delete' ? (
                    <Modal show={show} onHide={handleClose} centered>
                        <Modal.Body className={styles.formData}>
                            <label>ID Angajat</label>
                            <input type='text' name='_id' onChange={deleteData} placeholder='ID Angajat' />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='danger' onClick={handleClose}>
                                Inchide
                            </Button>
                            <Button
                                variant='primary'
                                onClick={() => {
                                    handleClose();
                                    if (updateDelValidator(emplDelete)) props.deleteEmployee(emplDelete);
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

MainPage.propTypes = {
    employees: PropTypes.array //declare the data structure of the variable wanted
};

export default connect(mapStateToProps, {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
})(MainPage); //connect connects the component to the redux store
