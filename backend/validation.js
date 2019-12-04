// validate createUser args - Register Input Type
module.exports.validateRegister = (username, password, email) =>{
    const errors = {};
    // validate username
    if (username.length < 3) {
        errors.username = 'Username must be three characters or more'
    }
    // validate password for special chars and numbers
    function containsSpecial(testPassword) {
        const specialChars = "/[ !@#$%^&*()_+-=\[\]{};':\\|,.<>\"/?]";
        for (let i=0; i < testPassword.length; i++) {
            if (specialChars.includes(testPassword[i])) {
                return true;
            }
        }
        return false;
    }
    function containsNumber(testPassword) {
        const numbers = "0123456789";
        for (let i=0; i < testPassword.length; i++) {
            if (numbers.includes(testPassword[i])) {
                return true;
            }
        }
        return false;
    }
    if (password.length < 8) {
        errors.password = 'Password must be 8 characters or longer';
    } else if (!containsNumber(password)) {
        errors.password = 'Password does not contain any numbers';
    } else if (!containsSpecial(password)) {
        errors.password = 'Password does not contain any special characters';
    }
    // validate email address with regex
    function isValidEmail(testEmail) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(testEmail).toLowerCase());
    }
    if (!isValidEmail(email)) {
        errors.email = 'Invalid email address'
    }
    // return object with valid and erros
    return { valid: Object.keys(errors).length < 1, errors }
};

module.exports.validateLogin = (username, password) => {
    const errors = {};
    if (username.length < 1) {
        errors.username = 'Username can not be empty';
    }
    if (password.length < 1) {
        errors.password = 'Password can not be empty';
    }
    return { valid: Object.keys(errors).length < 1, errors }
}