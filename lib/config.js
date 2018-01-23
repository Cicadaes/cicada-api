const rc = require('rc');
const sailsDisk = require('sails-disk');

module.exports = class Config {
    constructor() {
        this.config = this._initConfig();
    }

    
    _initConfig() {
        return rc('cic', this._default());
    }

    _default() {
        return {
            port: 3030,
            databases: {
                adapters: {
                    'sails-disk': sailsDisk
                },
                connections: {
                    'local-disk': {
                        adapter: 'sails-disk'
                    }
                },
                migrate: 'safe' //safe, alter(default), drop
            }
        };
    }
}