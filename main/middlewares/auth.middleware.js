var jwt = require("jsonwebtoken");
// const jwt = require('express-jwt');
const Config = require('../../lib/config');

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

    isToken(req, res, next) {
        var config = new Config().config;

        var token = req.body.token || req.query.token || req.headers["x-access-token"];
        jwt.verify(token, config.JWT_SECRET, function (err, decode) {
            if (err) {        
                res.json({code: 1, msg: err.name + ":" + err.message });
            } else {
                req.decode = decode; 
                next();
            }
        })

        // return jwt({
        //     secret: config.JWT_SECRET,
        //     userProperty: 'payload'
        // });
    }
};