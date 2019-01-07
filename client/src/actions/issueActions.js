import axios from "axios";

import { GET_ERRORS, GET_NEW_ISSUES, GET_ISSUE } from "./types";

export const newIssue = (issueData, history) => dispatch => {
    axios
        .post("/api/issues/newIssue", issueData)
        .then(res => history.push("/"))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Get public issues
export const getHomeIssues = () => dispatch => {
    axios
        .get("/api/issues")
        .then(res => dispatch({ type: GET_NEW_ISSUES, payload: res.data }))
        .catch(err => dispatch({ type: GET_NEW_ISSUES, payload: {} }));
};

// Get specific issues
export const getIssue = (issueTag, history) => dispatch => {
    axios
        .get(`/api/issues/${issueTag}`)
        .then(res => dispatch({ type: GET_ISSUE, payload: res.data }))
        .catch(err => history.push("/not-found"));
};
