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
                    index: true
                },
            }
        }
    }
};