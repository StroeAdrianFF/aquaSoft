import React, { useState } from 'react';
import styles from './AuthPage.module.css';
import { Modal, Button, Toast } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signInUser, signUpUser } from '../../actions/user';
import { Redirect } from 'react-router-dom';

const AuthPage = (props) => {
    const [status, setStatus] = useState(false);
    const [user, setUser] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');
    const userRef = React.createRef();
    const passwordRef = React.createRef();

    const addUserData = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const statusSetter = () => {
        setStatus(!status);
    };

    const validator = (data) => {
        let isValid = true;
        if (data?.username?.length < 3 || data?.password?.length < 5) {
            setShowToast(!showToast);
            setMessage('Numele trebuie sa contina minimum 3 caractere iar parola minimum 5');
            isValid = false;
        }
        return isValid;
    };

    const sendInfo = () => {
        if (validator(user)) {
            if (status === true) {
                props.signUpUser(user);
            } else {
                props.signInUser(user);
            }
            setTimeout(() => {
                window.location.reload();
            }, 250);
        }
        userRef.current.value = '';
        passwordRef.current.value = '';
    };

    if (localStorage.getItem('user')) {
        return <Redirect to='/'></Redirect>;
    }

    return (
        <div className={styles.bg}>
            <Modal.Dialog centered='true' className={`${styles.modal} dark`}>
                <Modal.Header>
                    <Modal.Title>Completeaza procesul de autentificare pentru a continua</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className={styles.bodyParent}>
                        <label>Username</label>
                        <input type='text' name='username' onChange={addUserData} ref={userRef} />
                        <label>Parola</label>
                        <input type='password' name='password' onChange={addUserData} ref={passwordRef} />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='warning' onClick={statusSetter}>
                        {status === true ? 'Logheaza-te' : 'Inregistreaza-te'}
                    </Button>
                    <Button variant='success' onClick={sendInfo}>
                        {status === true ? 'Trimite date inreg.' : 'Trimite date autent.'}
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
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

AuthPage.propTypes = {
    users: PropTypes.array
};

export default connect(null, { signUpUser, signInUser })(AuthPage);
