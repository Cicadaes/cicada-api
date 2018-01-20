const Controller = require('../../lib/init/main/controller');

module.exports = class ProjectController extends Controller {
    index(req, res) {
        res.render('project/index', {
            title: 'Project manager'
        });
    }

    getAdd(rea, res) {
        res.render('project/add', {
            title: 'Add project'
        });
    }

    postAdd(req, res) {
        const Project = this.app.orm.project;
    }
}