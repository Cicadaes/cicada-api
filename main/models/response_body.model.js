const Model = require('../../lib/base/model');

module.exports = class ProjectModel extends Model {
    schema() {
        return {
            identity: 'response_body',
            connection: 'local-disk',
            autoCreatedAt: true,
            autoUpdatedAt: true,
            attributes: {
                template: {
                    type: 'text'
                },
                interfaceId: {
                    model: 'interface',
                    index: true
                }
            }
        }
    }
};