const Controller = require('../../lib/base/controller');

module.exports = class ApiUserController extends Controller {
    // constructor(app) {
    //     super(app);
    // }

    index(req, res) {
        res.json({a:4});
    }
}