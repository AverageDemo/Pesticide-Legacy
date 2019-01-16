const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateNewCommentInput = data => {
    let errors = {};

    data.comment = !isEmpty(data.comment) ? data.comment : "";

    if (Validator.isEmpty(data.comment)) {
        errors.comment = "Text field is required";
    }

    return { errors, isValid: isEmpty(errors) };
};
