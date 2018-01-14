const Controller = require('../../lib/base/controller');

module.exports = class Login extends Controller {
    index(req, res) {
        res.render('login/index');
    }
}