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

        // Local strategy, sign in using Email and Password
        passport.use(new passportLocal({
            usernameField: 'email'
        }, (email, password, done) => {
            const UserModel = app.main.models.UserModel;

            app.orm.user.findOne({email: email.toLowerCase()}, (err, user) => {
                if (!user) {
                    return done(null, false, {msg: `Email ${email} not found.`});
                }
                if (!UserModel.validPassword(password, user.salt, user.hash)) {
                    return done(null, false, {msg: 'Invalid username or password.'});
                }
                return done(null, user);
            });
        }));
        next();
    }
};