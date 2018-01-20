const Controller = require('../../lib/init/main/controller');

module.exports = class ProjectController extends Controller {
    index(req, res) {
        res.render('project/index');
    }
}