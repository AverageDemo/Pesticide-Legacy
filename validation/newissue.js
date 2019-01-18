const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateNewIssueInput = data => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.category = !isEmpty(data.category) ? data.category : "";
    data.description = !isEmpty(data.description) ? data.description : "";
    data.project = !isEmpty(data.project) ? data.project : null;

    if (Validator.isEmpty(data.name)) {
        errors.name = "Issue name field is required";
    }

    if (Validator.isEmpty(data.category) || data.category === "null") {
        errors.category = "Category field is required";
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = "Description field is required";
    }
    return { errors, isValid: isEmpty(errors) };
};
