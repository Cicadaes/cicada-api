const passport = require('passport');

const Controller = require('../../lib/init/main/controller');

module.exports = class UserController extends Controller {
    index(req, res) {
        // this.app.orm.user.create({
        //     username: 'admin',
        //     email: 'admin@admin.com',
        //     password: 'admin'
        // }, (err, record) => {
        //     console.log(record);
        //     if (err) return res.status(500).json(err);
        // });
        this.app.orm.user.count().then((count) => {
            let page = Number(typeof req.query.page === 'undefined' ? 1 : req.query.page);
            let limit = 5;
            let pages = 0;
            let skip;
            // Total page
            pages = Math.ceil(count / limit);
            page = page < 1 ? 1 : page;
            page = page > pages ? pages : page;
            skip = (page - 1) * limit;

            this.app.orm.user
                .find({})
                .limit(limit)
                .skip(skip)
                .then((records) => {
                    res.render('user/index', {
                        title: 'User',
                        users: records,
                        count: count,
                        pages: pages,
                        page: page,
                        limit: limit
                    });
            });
        });
    }

    getLogin(req, res) {
        res.render('login/index', {
            title: 'Login'
        });
    }

    postLogin(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect('/login');
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                // res.redirect('/');
                const UserModel = this.app.main.models.UserModel;
                const token = UserModel.generateJwt();

                res.json({code: 0, msg: '', token: token});
            })
        })(req, res, next);
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
                    const UserModel = app.main.models.UserModel;
                    const token = UserModel.generateJwt();

                    res.json({code: 0, msg: '', token: token});
                })
            });
        })
    }

    /**
     * GET /logout
     * Log out.
     * @param {*} req 
     * @param {*} res 
     */
    logout(req, res) {
        req.logout();
        res.redirect('/');
    }
}