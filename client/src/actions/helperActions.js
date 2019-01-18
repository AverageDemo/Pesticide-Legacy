import axios from "axios";

import { GET_CATEGORIES, GET_PROJECTS } from "./types";

export const getCategories = () => dispatch => {
    axios
        .get("/api/issues/getCategories")
        .then(res => dispatch({ type: GET_CATEGORIES, payload: res.data }))
        .catch(err => dispatch({ type: GET_CATEGORIES, payload: null }));
};

export const getProjects = () => dispatch => {
    axios
        .get("/api/issues/getProjects")
        .then(res => dispatch({ type: GET_PROJECTS, payload: res.data }))
        .catch(err => dispatch({ type: GET_PROJECTS, payload: null }));
};
