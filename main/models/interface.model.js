const Model = require('../../lib/base/model');

module.exports = class ProjectModel extends Model {
    schema() {
        return {
            identity: 'interface',
            connection: 'local-disk',
            autoCreatedAt: true,
            autoUpdatedAt: true,
            attributes: {
                id: {
                    type: 'integer',
                    autoIncrement: true,
                    primaryKey: true
                },
                projectId: {
                    model: 'project',
                    required: true
                },
                method: {
                    type: 'string',
                    required: true
                },
                path: {
                    type: 'string',
                    required: true
                },
                path_regexp: {
                    type: 'string'
                },
                desc: {
                    type: 'string',
                    required: true
                },
                enable_mock: {
                    type: 'integer',
                    defaultsTo: 0
                },
                delay: {
                    type: 'integer',
                    defaultsTo: 0
                },
                responseBodyId: {
                    model: 'response_body',
                    index: true
                },
                createBy: {
                    type: 'string',
                    required: true,
                    index: true
                }
            }
        }
    }
};