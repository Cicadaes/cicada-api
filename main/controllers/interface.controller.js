const Controller = require('../../lib/init/main/controller');
const pathToRegexp = require('path-to-regexp');

module.exports = class InterfaceController extends Controller {
    index(req, res) {
        const Interface = this.app.orm.interface;

        Interface.count().where({
            createBy: req.user[0].id
        }).then((count) => {
            let page = Number(typeof req.query.page === 'undefined' ? 1 : req.query.page);
            let limit = 10;
            let pages = 0;
            let skip;
            // Total page
            pages = Math.ceil(count / limit);
            page = page < 1 ? 1 : page;
            page = page > pages ? pages : page;
            skip = (page - 1) * limit;

            Interface.find()
                .where({
                    createBy: req.user[0].id
                })
                .populate('projectId')
                .sort('path asc')
                .limit(limit)
                .skip(skip)
                .exec((err, records) => {
                    return res.render('interface/index', {
                        title: 'Interface manager',
                        interfaces: records,
                        count: count,
                        pages: pages,
                        page: page,
                        limit: limit
                    });
            });
        });
    }

    getAdd(req, res) {
        const Project = this.app.orm.project;

        Project.find().where({createBy: req.user[0].id}).exec((err, records) => {
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

        let keys = [];
        let path_regexp = pathToRegexp(req.body.path, keys).toString().substring(1);
        path_regexp = encodeURI(path_regexp.substring(0, path_regexp.length - 2));
        if (keys.length > 0) {
            // i.e. /:name/:age
            req.body.path_regexp = path_regexp;
        } else {
            req.body.path_regexp = null;
        }
        req.body.createBy = req.user[0].id;

        Interface.create(req.body).exec((err, record) => {
            if (err) {
                return res.json({code: 1, msg: 'Add interface fail'});
            }
            let rb = {};
            const Response_body = this.app.orm.response_body;

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
        const Interface = this.app.orm.interface;
        const Project = this.app.orm.project;
        const id = req.params.id;

        Project.find().where({createBy: req.user[0].id}).exec((err, projects) => {
            
            Interface.findOne({id: id}).populate('projectId').populate('responseBodyId').exec((err, record) => {
                if (record) {
                    return res.render('interface/edit', {
                        interface: record,
                        projects: projects
                    });
                } else {
                    res.end('Not found');
                }
            });
        });
    }

    postEdit(req, res) {
        const Interface = this.app.orm.interface;

        req.body.createBy = req.user[0].id;

        Interface.update({id: req.params.id}, req.body).exec((err, record) => {
            if (err) {
                return res.json({code: 1, msg: 'Update interface fail'});
            }
            let rb = {};
            const Response_body = this.app.orm.response_body;

            rb.interfaceId = req.params.id;
            rb.template = req.body.response_body;
            Response_body.update({interfaceId: req.params.id}, rb).exec((err, body) => {
                return res.json({code: 0, msg: 'Update interface success'});
            });
        });
    }

    delete(req, res) {
        const Interface = this.app.orm.interface;
        const Response_body = this.app.orm.response_body;
        const id = req.params.id;

        Interface.destroy({id: id}).exec((err, record) => {
            if (err) {
                return res.json({code: 1, msg: 'Delete fail'});
            }
            Response_body.destroy({interfaceId: id}).exec((err, record) => {
                return res.json({code: 0, msg: 'Delete success'});
            });
        });
    }

    deletes(req, res) {
        const Interface = this.app.orm.interface;
        const ids = req.body.ids;

        Interface.destroy({id: ids}).exec((err) => {
            if (err) {
                return res.json({code: 1, msg: 'Delete fail'});
            } else {
                return res.json({code: 0, msg: 'Delete success'});
            }
        })
    }

    search(req, res) {
        const Interface = this.app.orm.interface;

        Interface.find().where({projectId: req.params.id}).populate('projectId').sort('path asc').exec((err, records) => {
            res.render('interface/index', {
                title: 'Interface manager',
                interfaces: records
            });
        });
    }
}