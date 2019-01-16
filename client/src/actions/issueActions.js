import axios from "axios";

import { GET_ERRORS, GET_NEW_ISSUES, GET_ISSUE, GET_CATEGORIES } from "./types";

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
        .get(`/api/issues/v/${issueTag}`)
        .then(res => dispatch({ type: GET_ISSUE, payload: res.data }))
        .catch(err => history.push("/not-found"));
};

export const solveIssue = (issueTag, history, issueData) => dispatch => {
    axios
        .post(`/api/issues/v/${issueTag}/close`, issueData)
        .then(res => history.go(0))
        .catch(err => console.log(err));
};

export const newComment = (issueTag, history, comment) => dispatch => {
    axios
        .post(`/api/issues/v/${issueTag}/comment`, comment)
        .then(res => history.go(0))
        .catch(err => console.log(err));
};

export const getCategories = () => dispatch => {
    axios
        .get("/api/issues/getCategories")
        .then(res => dispatch({ type: GET_CATEGORIES, payload: res.data }))
        .catch(err => dispatch({ type: GET_CATEGORIES, payload: {} }));
};
