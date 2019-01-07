import isEmpty from "../validation/is-empty";

import { GET_NEW_ISSUES } from "../actions/types";

const initialState = {
    issues: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_NEW_ISSUES:
            return {
                ...state,
                issues: action.payload
            };
        default:
            return state;
    }
}
