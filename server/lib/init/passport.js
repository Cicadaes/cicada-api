const passport = require('passport');
const passportLocal = require('passport-local');



module.exports = class Passport {
    constructor(app, next) {
        let user_cache = {};

        // Must implement passport.serializeUser and passport.deserializeUser,
        // otherwise throw `Error: failed to serialize user into session`
        passport.serializeUser(function (user, done) {
            let id = user.id;
            user_cache[id] = user;
            done(null, id);
        });

        passport.deserializeUser(function (id, done) {
            done(null, user_cache[id]);
        });

        // passport.use(new passportLocal({
        //     usernameField: 'email'
        // }, (email, password, done) => {

        // }));
        next();
    }
};