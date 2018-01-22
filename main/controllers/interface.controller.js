const Controller = require('../../lib/init/main/controller');

module.exports = class InterfaceController extends Controller {
    index(req, res) {
        const Interface = this.app.orm.interface;

        Interface.find().sort('name asc').exec((err, records) => {
            res.render('interface/index', {
                title: 'Interface manager',
                interfaces: records
            });
        });
    }

    getAdd(rea, res) {
        const Project = this.app.orm.project;

        Project.find().exec((err, records) => {
            res.render('interface/add', {
                title: 'Add interface',
                projects: records
            });
        });
    }

    postAdd(req, res) {
        const Interface = this.app.orm.interface;
        // let err;

        // req.assert('name', 'Name is required').notEmpty();
        // req.assert('description', 'Description is required').notEmpty();

        // err = req.validationErrors();
        // if (err) {
        //     return  res.json({code: 1, msg: 'Invalid name or description'});
        // }

        Interface.create(req.body).exec((err, record) => {
            if (err) {
                return res.json({code: 1, msg: 'Add interface fail'});
            }
            var rb = {};
            var Response_body = this.app.orm.response_body;

            rb.interfaceId = record.id;
            rb.template = req.body.response_body;
            Response_body.create(rb).exec((err, body) => {
                if (body) {
                    Interface.update(record.id, {responseBodyId: body.id}).exec((err, u) => {

                    });
                }
            });
            return res.json({code: 0, msg: 'Add interface success'});
        });
    }

    getEdit(req, res) {
        const Project = this.app.orm.project;
        const id = req.params.id;

        Project.findOne({id: id}).exec((err, record) => {
            if (record) {
                return res.render('project/edit', {
                    project: record
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