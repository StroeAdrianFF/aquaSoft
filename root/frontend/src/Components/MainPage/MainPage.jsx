import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from '../../actions/employee';
import styles from './MainPage.module.css';

const mapStateToProps = (state) => ({
    //access state variables
    employees: state.employee.employees
});

const MainPage = (props) => {
    const [emplData, setEmplData] = useState({});
    const [emplData2, setEmplData2] = useState({});
    const [emplData3, setEmplData3] = useState({});

    const getData = () => {
        props.getEmployees();
    };

    const onChange = (e) => {
        setEmplData({ ...emplData, [e.target.name]: e.target.value });
    };
    const onChange2 = (e) => {
        setEmplData2({ ...emplData2, [e.target.name]: e.target.value });
    };
    const onChange3 = (e) => {
        setEmplData3({ ...emplData3, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.bg}>
            {/* LOAD EMPLOYEES */}
            GET
            <button onClick={getData}>LOAD ME BIATCH</button>
            {props.employees.length > 0 && props.employees.map((employee) => <p key={employee._id}>{employee.name}</p>)}
            {/* ADD NEW EMPLOYEE */}
            ADD
            <input type='text' name='name' onChange={onChange} />
            <input type='text' name='address' onChange={onChange} />
            <input type='text' name='email' onChange={onChange} />
            <input type='text' name='hire_date' onChange={onChange} />
            <input type='text' name='salary' onChange={onChange} />
            <input type='text' name='job_title' onChange={onChange} />
            <button onClick={() => props.addEmployee(emplData)}>test</button>
            {/* UPDATE AN EMPLOYEE */}
            UPDATE
            <input type='text' name='_id' onChange={onChange2} />
            <input type='text' name='name' onChange={onChange2} />
            <input type='text' name='address' onChange={onChange2} />
            <input type='text' name='email' onChange={onChange2} />
            <input type='text' name='hire_date' onChange={onChange2} />
            <input type='text' name='salary' onChange={onChange2} />
            <input type='text' name='job_title' onChange={onChange2} />
            <input type='text' name='project_id' onChange={onChange2} />
            <button onClick={() => props.updateEmployee(emplData2)}>test</button>
            {/* DELETE AN EMPLOYEE */}
            DELETE
            <input type='text' name='_id' onChange={onChange3} />
            <button onClick={() => props.deleteEmployee(emplData3)}>test</button>
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
