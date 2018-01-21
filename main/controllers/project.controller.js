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
        let err;

        req.assert('name', 'Name is required').notEmpty();
        req.assert('description', 'Description is required').notEmpty();

        err = req.validationErrors();
        if (err) {
            return  res.json({code: 1, msg: 'Invalid name or description'});
        }

        Project.create(req.body).exec(function (err, p) {
            if (err) {
                return res.json({code: 1, msg: 'Add project fail'});
            }
            return res.json({code: 0, msg: 'Add project success'});
        });
    }
}