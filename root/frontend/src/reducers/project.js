const initialState = {
    //define initial state of projects
    projects: []
};

export default function project(state = initialState, action) {
    //only get has payloads because it returns some data upon success
    switch (action.type) {
        case 'GET_PROJECTS':
            return {
                ...state,
                projects: action.payload
            };
        default:
            return state;
    }
}
