const moment = require('moment');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const Model = require('../../lib/base/model');
const Config = require('../../lib/config');

module.exports = class UserModel extends Model {
    schema() {
        return {
            identity: 'user',
            connection: 'local-disk',
            autoPK: true,
            autoCreatedAt: false,
            autoUpdatedAt: false,
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
                hash: {
                    type: 'string'
                },
                salt: {
                    type: 'string'
                },
                createdAt: {
                    type: 'string',
                    defaultsTo: function () {
                        return moment().format('MMMM Do YYYY');
                    }
                }
            },
            beforeCreate(values, cb) {
                values.salt = crypto.randomBytes(16).toString('hex');
                values.hash = crypto.pbkdf2Sync(values.password, values.salt, 1000, 64, 'sha512').toString('hex');
                cb();
            }
        }
    }

    validPassword(password, salt, hash) {
        const _hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        return hash === _hash;
    }

    generateJwt() {
        const expiry = new Date();
        const config = new Config().config;

        expiry.setDate(expiry.getDate() + 7);

        return jwt.sign({
           id: this.id,
           email: this.email,
           username: this.username,
           exp: parseInt(expiry.getTime()/1000, config.JWT_SECRET)
        }, config.JWT_SECRET);
    }
};