const Controller = require('../../lib/base/controller');

module.exports = class UserController extends Controller {
    // constructor(app) {
    //     super(app);
    // }

    index(req, res) {
        res.json({a:4});
    }
}