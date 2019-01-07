import axios from "axios";

import { GET_ERRORS, GET_NEW_ISSUES } from "./types";

export const newIssue = (issueData, history) => dispatch => {
    axios
        .post("/api/issues/newIssue", issueData)
        .then(res => history.push("/"))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Get unresolved public issues
export const getHomeIssues = () => dispatch => {
    axios
        .get("/api/issues")
        .then(res => dispatch({ type: GET_NEW_ISSUES, payload: res.data }))
        .catch(err => dispatch({ type: GET_NEW_ISSUES, payload: {} }));
};
