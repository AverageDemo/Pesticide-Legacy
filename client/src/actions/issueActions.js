import axios from "axios";

import { GET_ERRORS } from "./types";

export const newIssue = (issueData, history) => dispatch => {
    axios
        .post("/api/issues/newIssue", issueData)
        .then(res => history.push("/"))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
