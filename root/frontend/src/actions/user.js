import axios from 'axios';

export const signUpUser = (data) => async (dispatch) => {
    try {
        const signUpData = await axios.post('http://localhost:5000/signUp', data, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        dispatch({
            type: 'SIGN_UP',
            payload: signUpData.data.token
        });
    } catch (error) {
        console.log(error);
    }
};

export const signInUser = (data) => async (dispatch) => {
    try {
        const signInData = await axios.post('http://localhost:5000/signIn', data, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        dispatch({
            type: 'SIGN_IN',
            payload: signInData.data.token
        });
    } catch (error) {
        console.log(error);
    }
};
