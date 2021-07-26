const initialState = {
    employees: []
}

export default function employee(state = initialState, action) {
    switch(action.type) {
        case "GET_EMPLOYEES":
            return {
                ...state,
                employees: action.payload
            };
        default:
            return state;
    }
}