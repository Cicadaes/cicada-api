const Controller = require('../../lib/base/controller');

module.exports = class UserController extends Controller {
    getLogin(req, res) {
        res.render('login/index', {
            title: 'Login'
        });
    }

    getSignup(req, res) {
        res.render('signup/index', {
            title: 'Sign up'
        });
    }

    postSignup(req, res, next) {
        let User = this.app.orm.user;
        let err;

        req.assert('email', 'Email is invalid').isEmail();
        req.assert('password', 'Password must be at least length of 6').len(6);
        req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
        req.sanitize('email').normalizeEmail({ remove_dots: false });
        
        err = req.validationErrors();
        if (err) {
            return res.redirect('/signup');
        }

        User.find({email: req.body.email}, (err, records) => {
            if (records.length > 0 || err) {
                return res.redirect('/signup');
            }
            User.create(req.body, (err, user) => {
                if (err) {
                    return next(err);
                }
                req.logIn(user, (err) => {
                    if (err) {
                        return next(err);
                    }
                    res.redirect('/');
                })
            });
        })
    }
}