import axios from 'axios';

export const getProjects = () => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:5000/projects', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('user')}`
            }
        });

        dispatch({
            type: 'GET_PROJECTS',
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
};

export const addProject = (data) => async (dispatch) => {
    try {
        await axios.post('http://localhost:5000/insertProject', data, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('user')}`
            }
        });
        dispatch({
            type: 'POST_PROJECT'
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateProject = (data) => async (dispatch) => {
    try {
        await axios.put(`http://localhost:5000/updateProject/${data._id}`, data, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('user')}`
            }
        });
        dispatch({
            type: 'UPDATE_PROJECT'
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteProject = (data) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:5000/deleteProject/${data._id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('user')}`
            }
        });
        dispatch({
            type: 'DELETE_PROJECT'
        });
    } catch (error) {
        console.log(error);
    }
};
