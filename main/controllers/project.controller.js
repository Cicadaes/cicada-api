const Controller = require('../../lib/init/main/controller');

module.exports = class ProjectController extends Controller {
    index(req, res) {
        const Project = this.app.orm.project;

        Project.find().sort('name asc').exec((err, records) => {
            res.render('project/index', {
                title: 'Project manager',
                projects: records,
                breadcrumb: res.locals.breadcrumb
            });
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

        Project.create(req.body).exec((err, p) => {
            if (err) {
                return res.json({code: 1, msg: 'Add project fail'});
            }
            return res.json({code: 0, msg: 'Add project success'});
        });
    }

    getEdit(req, res) {
        const Project = this.app.orm.project;
        const id = req.params.id;

        Project.findOne({id: id}).exec((err, record) => {
            if (record) {
                return res.render('project/edit', {
                    project: record,
                    breadcrumb: res.locals.breadcrumb
                });
            } else {
                res.end('Not found');
            }
        });
    }

    postEdit(req, res) {
        const Project = this.app.orm.project;
        const id = req.params.id;
        let err;

        req.assert('name', 'Name is required').notEmpty();
        req.assert('description', 'Description is required').notEmpty();

        err = req.validationErrors();
        if (err) {
            return res.json({code: 1, msg: 'Invalid name or description'});
        }

        Project.update({id: id}, req.body).exec((err, record) => {
            if (err || !record) {
                return res.json({code: 1, msg: 'Update fail'});
            }
            return res.json({code: 0, msg: 'Update success'});
        });
    }

    delete(req, res) {
        const Project = this.app.orm.project;
        const id = req.params.id;

        Project.findOne(id).exec((err, record) => {
            Project.destroy({name: {like: record.name+'%'}}).exec((err, record) => {
                if (err) {
                    return res.json({code: 1, msg: 'Delete fail'});
                }
                return res.json({code: 0, msg: 'Delete success'});
            });
        });
    }
}