import { validEmail, stopFormSubmit } from './validation_utils.js';

const login_form = document.getElementById('login_form');
login_form.addEventListener('submit', (e) => {
    if (!validEmail(e.target.email.value)) {
        stopFormSubmit(e, 'This is not a valid email');
    }
});