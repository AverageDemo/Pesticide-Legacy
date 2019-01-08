import isEmpty from "../validation/is-empty";

import { SET_CURRENT_USER, GET_PERMISSIONS } from "../actions/types";

const initialState = {
    isAuthenticated: false,
    user: {},
    permissions: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case GET_PERMISSIONS:
            return {
                ...state,
                permissions: action.payload
            };
        default:
            return state;
    }
}
