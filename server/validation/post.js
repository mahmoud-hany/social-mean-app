const validator = require('validator');
const isEmpty = require('./isEmpty');

const validatePostInput = data => {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.text = !isEmpty(data.text) ? data.text : '';

    if ( validator.isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }

    if ( validator.isEmpty(data.text)) {
        errors.text = 'Text field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};

module.exports = validatePostInput;