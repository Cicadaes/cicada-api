const Base = require('./base');

module.exports = class BaseMiddleware extends Base {
    constructor(app, ns, next) {
        super(app, ns);
        this.app[ns].middlewares = this.loadModule(this.app[ns].middlewares);
        next();
    }
}