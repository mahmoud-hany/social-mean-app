const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateRegisterInputs = data => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (!validator.isLength(data.name, {min: 4, max: 30})) {
        errors.name = 'Name must be between 4 and 30 characters';
    }

    if(!validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is not valid'
    }

    if (validator.isEmpty(data.name)) {
        errors.name = 'Name is required';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }
    
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }
    
    if (validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password is required';
    }

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = 'Password must match'
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
};

module.exports =  validateRegisterInputs;