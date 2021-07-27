import axios from 'axios';

export const getEmployees = () => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:5000/ordered');

        dispatch({
            type: 'GET_EMPLOYEES',
            payload: res.data
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addEmployee = (data) => async (dispatch) => {
    try {
        await axios.post('http://localhost:5000/insertEmpl', data, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        dispatch({
            type: 'POST_EMPLOYEE'
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateEmployee = (data) => async (dispatch) => {
    try {
        await axios.put(`http://localhost:5000/updateEmpl/${data._id}`, data, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        dispatch({
            type: 'UPDATE_EMPLOYEE'
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteEmployee = (data) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:5000/delete/${data._id}`);
        dispatch({
            type: 'DELETE_EMPLOYEE'
        });
    } catch (error) {
        console.log(error);
    }
};
