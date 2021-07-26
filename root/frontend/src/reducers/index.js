import {combineReducers} from 'redux'
import employee from './employee'
import project from './project'

export default combineReducers({//combine all the reducers into 1
    employee,
    project
})