module.exports = class AuthMiddleware {
    /**
     * Login required middleware
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    }
};