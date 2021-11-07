module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        console.log('error', 'Debes registrarte primero!');
        return res.end();
    }
    next();
}
//Para recordar url se puede utilizar req.session