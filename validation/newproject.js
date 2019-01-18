const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateNewProjectInput = data => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";

    if (Validator.isEmpty(data.name)) {
        errors.name = "Project name field is required";
    }

    return { errors, isValid: isEmpty(errors) };
};
