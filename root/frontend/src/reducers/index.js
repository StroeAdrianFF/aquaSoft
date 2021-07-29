import { combineReducers } from 'redux';
import employee from './employee';
import project from './project';
import user from './user';

export default combineReducers({
    //combine all the reducers into 1
    employee,
    project,
    user
});
