const initialState = {
    authData: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGN_UP':
            localStorage.setItem('user', JSON.stringify(action.payload));
            return { ...state, authData: action.payload };
        case 'SIGN_IN':
            localStorage.setItem('user', JSON.stringify(action.payload));
            return { ...state, authData: action.payload };
        default:
            return state;
    }
};

export default userReducer;
