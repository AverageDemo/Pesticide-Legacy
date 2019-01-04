const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateNewCommentInput = data => {
    let errors = {};

    data.value = !isEmpty(data.value) ? data.value : "";

    if (Validator.isEmpty(data.value)) {
        errors.value = "Text field is required";
    }

    return { errors, isValid: isEmpty(errors) };
};
