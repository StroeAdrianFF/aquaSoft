import {combineReducers} from 'redux'
import employee from './employee'
import project from './project'

export default combineReducers({
    employee,
    project
})