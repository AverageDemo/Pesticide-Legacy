import { GET_NEW_ISSUES, GET_ISSUE, CLOSE_ISSUE } from "../actions/types";

const initialState = {
    issues: null,
    issue: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_NEW_ISSUES:
            return {
                ...state,
                issues: action.payload
            };
        case GET_ISSUE:
            return {
                ...state,
                issue: action.payload
            };
        case CLOSE_ISSUE:
            return {
                ...state,
                issue: action.payload
            };
        default:
            return state;
    }
}
