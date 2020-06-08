const getLogin = async (req, res) => {
    res.render('auth/login');
}

const getRegister = async (req, res) => {
    res.render('auth/register');
}

module.exports = { getLogin, getRegister }