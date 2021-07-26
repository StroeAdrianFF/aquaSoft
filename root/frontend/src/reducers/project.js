const initialState = {
    projects: [],
  };
  
  export default function project(state = initialState, action) {
    switch (action.type) {
      case "GET_PROJECTS":
        return {
          ...state,
          projects: action.payload,
        };
      default:
        return state;
    }
  }
  