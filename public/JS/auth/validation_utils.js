export const validEmail = (email) => {
    let has_at = false;
    let has_dot= false;
    for (let i = 0; i < email.length; i++) {
        if (email[i] === '@') {
            has_at = true;
        }
        else if (email[i] === '.') {
            has_dot = true;
        }
    }
    if (has_at && has_dot) {
        return true;
    }
    else {
        return false;
    }
}

export const validName = (name) => {
    if (name.length <= 3) {
        return false;
    }
    return true;
}

export const matchingPassword = (password, repeat) => {
    if (password !== repeat) {
        return false;
    }
    return true;
}

export const longPassword = (password) => {
    if (password.length <= 7) {
        return false;
    }
    return true;
}

export const stopFormSubmit = (e, message) => {
    e.preventDefault();
    const flash_box = document.querySelector('.auth_flash');
    flash_box.innerHTML = message;
    setTimeout(() => flash_box.innerHTML = '', 2000);
}
