const Controller = require('../../lib/base/controller');

module.exports = class ApiController extends Controller {
    // constructor(app) {
    //     super(app);
    // }

    index(req, res) {
        const orm = this.app.orm;
        const Interface = orm.interface;
        const Project = orm.project;
        const Response_body = orm.response_body;
        let prefix;
        let project;
        let projectId;
        let path;
        let method;

        prefix = req.path.match(/\/api\/(\w+)\/(.+)/);
        if (!prefix || prefix.length < 3) {
            return res.json({code: 1, msg: '404, Api not found'});
        }
        project = prefix[1];
        Project.findOne({name: project}).exec((err, proj) => {
            if (err || !proj) {
                return res.json({code: 1, msg: '404, Api not found'});
            }
            projectId = proj.id;
            path = prefix[2];
            method = req.method;
            // Interface.findOne().where({projectId: projectId, method: method, path: path}).exec((err, inte) => {
            //     if (err || !inte) {
            //         return res.json({code: 1, msg: '404, Api not found'});
            //     }
            //     Response_body.findOne().where({id: inte.responseBodyId}).exec((err, body) => {
            //         if (err || !body) {
            //             return res.json({code: 1, msg: '404, Api not found'});
            //         }
            //         return res.json({code: 1, msg: '', data: JSON.parse(body.template)});
            //     });
            // });
            const where = {projectId: projectId, method: method, path: path};
            Interface.count().where(where).exec((err, count) => {
                if (!err && count == 1) {
                    Interface.findOne().where(where).populate('responseBodyId').exec((err, record) => {
                        const responser = record.responseBodyId.template;
                        if (responser) {
                            return res.json({code: 0, msg: '', data: JSON.parse(record.responseBodyId.template)});
                        }
                        return res.json({code: 0, msg: '', data: {}});
                    });
                } else {
                    return res.json({code: 1, msg: '404, Api not found'});
                }
            });
        });
    }
}