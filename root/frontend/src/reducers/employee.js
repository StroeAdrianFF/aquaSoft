const initialState = {
    //define initial state of employees
    employees: []
};

export default function employee(state = initialState, action) {
    //only get has payloads because it returns some data upon success
    switch (action.type) {
        case 'GET_EMPLOYEES':
            return {
                ...state,
                employees: action.payload
            };
        default:
            return state;
    }
}
