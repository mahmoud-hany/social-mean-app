const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateProfileInputts = data => {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to be between 2 and 40 charcters'
    }
    
    if (validator.isEmpty(data.handle)){
        errors.handle = 'Profile handle is required';
    }

    if (validator.isEmpty(data.status)){
        errors.status = 'Status is required';
    }

    if (validator.isEmpty(data.skills)){
        errors.skills = 'Skills is required';
    }

    if (!isEmpty(data.website)) {
        if (!validator.isURL(data.website)) {
            errors.website = 'Website is not a vaild URL';
        }
    }

    if (!isEmpty(data.youtube)) {
        if (!validator.isURL(data.youtube)) {
            errors.youtube = 'Not a vaild URL';
        }
    }

    if (!isEmpty(data.twitter)) {
        if (!validator.isURL(data.twitter)) {
            errors.twitter = 'Not a vaild URL';
        }
    }

    if (!isEmpty(data.facebook)) {
        if (!validator.isURL(data.facebook)) {
            errors.facebook = 'Not a vaild URL';
        }
    }
    
    if (!isEmpty(data.linkedin)) {
        if (!validator.isURL(data.linkedin)) {
            errors.linkedin = 'Not a vaild URL';
        }
    }

    if (!isEmpty(data.github)) {
        if (!validator.isURL(data.github)) {
            errors.github = 'Not a vaild URL';
        }
    }

    return {
        errors,
        isVaild: isEmpty(errors)
    }
};

module.exports = validateProfileInputts;