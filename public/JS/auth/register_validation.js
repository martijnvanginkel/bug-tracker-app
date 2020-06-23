import { stopFormSubmit, longPassword, matchingPassword, validName, validEmail } from './validation_utils.js'

const register_form = document.getElementById('register_form');
register_form.addEventListener('submit', (e) => {
    if (!validName(e.target.name.value)) {
        stopFormSubmit(e, 'Name is too short');
    }
    else if (!validEmail(e.target.email.value)) {
        stopFormSubmit(e, 'This is not a valid email');
    }
    else if (!longPassword(e.target.password.value)) {
        stopFormSubmit(e, 'Password is too short');
    }
    else if (!matchingPassword(e.target.password.value, e.target.repeat_password.value)) {
        stopFormSubmit(e, `Passwords don't match`);
    }
});