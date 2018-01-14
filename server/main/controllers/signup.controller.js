const Controller = require('../../lib/base/controller');

module.exports = class Signup extends Controller {
    index(req, res) {
        res.render('signup/index');
    }
}