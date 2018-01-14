const passport = require('passport');

module.exports = class AuthMiddleware {
    constructor() {
        let user_cache = {};

        // Must implement passport.serializeUser and passport.deserializeUser,
        // otherwise throw `Error: failed to serialize user into session`
        passport.serializeUser(function (user, next) {
            let id = user.id;
            user_cache[id] = user;
            next(null, id);
        });

        passport.deserializeUser(function (id, next) {
            next(null, user_cache[id]);
        });
    }
};