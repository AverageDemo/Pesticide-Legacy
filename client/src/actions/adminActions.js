import axios from "axios";

import { GET_ERRORS } from "./types";

// User registration
export const newCategory = (categoryData, history) => dispatch => {
    axios
        .post("/api/issues/newCategory", categoryData)
        .then(res => history.go(0))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
