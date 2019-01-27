const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateNewCategoryInput = data => {
    let errors = {};

    data.categoryName = !isEmpty(data.categoryName) ? data.categoryName : "";

    if (Validator.isEmpty(data.categoryName)) {
        errors.categoryName = "Category name field is required";
    }

    return { errors, isValid: isEmpty(errors) };
};
