const Controller = require('../../lib/base/controller');

module.exports = class UserController extends Controller {
    getLogin(req, res) {
        res.render('login/index');
    }

    getSignup(req, res) {
        res.render('signup/index');
    }
}