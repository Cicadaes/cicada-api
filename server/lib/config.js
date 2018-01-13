const rc = require('rc');

module.exports = class Config {
    constructor() {
        this.config = this.initConfig();
    }

    
    initConfig() {
        return rc('cic', this._default());
    }

    _default() {
        return {
            port: 3030
        };
    }
}