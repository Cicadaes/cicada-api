const passport = require('passport');
const passportLocal = require('passport-local');

module.exports = class Passport {
    constructor(app, next) {
        // Passport
        app.express.use(passport.initialize());
        app.express.use(passport.session());

        // Must implement passport.serializeUser and passport.deserializeUser,
        // otherwise throw `Error: failed to serialize user into session`
        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(function (id, done) {
            app.orm.user.findById(id, (err, user) => {
                done(null, user);
            });
        });

        // passport.use(new passportLocal({
        //     usernameField: 'email'
        // }, (email, password, done) => {

        // }));
        next();
    }
};