import isEmpty from "../validation/is-empty";

import { SET_NEW_ISSUE } from "../actions/types";

const initialState = {
    issue: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
