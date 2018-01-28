const Model = require('../../lib/base/model');

module.exports = class ProjectModel extends Model {
    schema() {
        return {
            identity: 'project',
            connection: 'local-disk',
            autoCreatedAt: true,
            autoUpdatedAt: true,
            attributes: {
                id: {
                    type: 'integer',
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: 'string',
                    size: 20,
                    maxLength: 20,
                    required: true,
                    index: true,
                    unique: true
                },
                description: {
                    type: 'string',
                    size: 100
                },
                createBy: {
                    type: 'string',
                    required: true,
                    index: true
                },
                interfaces: {
                  collection: 'interface',
                  via: 'projectId'
                }
            }
        }
    }
};