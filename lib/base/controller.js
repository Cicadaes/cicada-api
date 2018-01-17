const Base = require('./base');

module.exports = class BaseController extends Base {
    constructor(app, ns, next) {
        super(app, ns);
        if (this.constructor.name === 'Controller') {
            this.app[ns].controllers = this.loadModule(this.app[ns].controllers);
            next();
        }
    }
};