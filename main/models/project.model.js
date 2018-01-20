const Model = require('../../lib/base/model');

module.exports = class ProjectModel extends Model {
    schema() {
        return {
            identity: 'project',
            connection: 'local-disk',
            autoPK: true,
            autoCreatedAt: true,
            autoUpdatedAt: true,
            attributes: {
                name: {
                    type: 'string',
                    required: true
                },
                description: {
                    type: 'string'
                }
            },
        }
    }
};