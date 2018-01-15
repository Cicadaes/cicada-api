const passport = require('passport');
const passportLocal = require('passport-local');



module.exports = class PassportHelper {
    constructor(app) {
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

        // passport.use(new passportLocal({
        //     usernameField: 'email'
        // }, (email, password, done) => {

        // }));
    }
};