import axios from 'axios';

export const getEmployees = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/ordered');

        dispatch({
            type: "GET_EMPLOYEES",
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}