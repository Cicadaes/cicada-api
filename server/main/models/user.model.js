const Model = require('../../lib/base/model');

module.exports = class UserModel extends Model {
    schema() {
        return {
            identity: 'user',
            connection: 'local-disk',
            autoPK: true,
            autoCreatedAt: true,
            autoUpdatedAt: true,
            attributes: {
                username: {
                    type: 'string',
                    required: true
                },
                email: {
                    type: 'email',
                    unique: true,
                    required: true,
                    index: true
                },
                password: {
                    type: 'string',
                    required: true
                }
            },
        }
    }
};