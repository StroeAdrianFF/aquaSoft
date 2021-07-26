import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getEmployees} from '../../actions/employee'

import styles from './MainPage.module.css'


const MainPage = (props) => {

    const test = () => {
        props.getEmployees();
    }

    return (
        <div className={styles.bg}>
            <button onClick={test}>LOAD ME BIATCH</button>
            {props.employees.length > 0 && props.employees.map(employee => <p key={employee._id}>{employee.name}</p>)}
        </div>
    )
}

MainPage.propTypes = {
    employees: PropTypes.array //declare the data structure of the variable wanted
}

const mapStateToProps = (state) => ({//access state variables
    employees: state.employee.employees
})

export default connect(mapStateToProps, { getEmployees })(MainPage)
