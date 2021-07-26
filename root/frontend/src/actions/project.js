import axios from 'axios';

export const getProjects = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/projects');

        dispatch({
            type: "GET_PROJECTS",
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}