const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateLoginInputs = data => {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';


    if(!validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password is not valid';
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is not valid'
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }
    
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
};

module.exports =  validateLoginInputs;