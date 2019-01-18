import { GET_CATEGORIES, GET_PROJECTS } from "../actions/types";

const initialState = {
    categories: null,
    projects: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            };
        default:
            return state;
    }
}
