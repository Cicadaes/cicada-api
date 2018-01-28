const Controller = require('../../lib/init/main/controller');

module.exports = class ProjectController extends Controller {
    index(req, res) {
        const Project = this.app.orm.project;

        Project.count().where({
            createBy: req.user[0].id
        }).then((count) => {
            let page = Number(typeof req.query.page === 'undefined' ? 1 : req.query.page);
            let limit = 5;
            let pages = 0;
            let skip;
            // Total page
            pages = Math.ceil(count / limit);
            page = page < 1 ? 1 : page;
            page = page > pages ? pages : page;
            skip = (page - 1) * limit;

            // .paginate({page: page, limit: limit})
            Project.find()
                .where({
                    createBy: req.user[0].id
                })
                .sort('name asc')
                .limit(limit)
                .skip(skip)
                .exec((err, records) => {
                res.render('project/index', {
                    title: 'Project manager',
                    projects: records,
                    count: count,
                    pages: pages,
                    page: page,
                    limit: limit
                });
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
        req.body.createBy = req.user[0].id;

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
        req.body.createBy = req.user[0].id;

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

    deletes(req, res) {
        const Project = this.app.orm.project;
        const ids = req.body.ids;

        Project.destroy({id: ids}).exec((err) => {
            if (err) {
                return res.json({code: 1, msg: 'Delete fail'});
            } else {
                return res.json({code: 0, msg: 'Delete success'});
            }
        })
    }
}