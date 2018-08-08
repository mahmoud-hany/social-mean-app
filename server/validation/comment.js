const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateCommentInput = data => {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

    if ( validator.isEmpty(data.text)) {
        errors.text = 'Text field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};

module.exports = validateCommentInput;