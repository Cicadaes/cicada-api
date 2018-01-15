module.exports = class Base {
    /**
     * Assign instance of Cic to this
     * @param {*} app 
     */
    constructor(app, ns) {
        // namespace
        this.ns = ns;
        this._defineProp(app);
    }

    _defineProp(app) {
        Object.defineProperty(this, 'app', {
            enumerable: false,
            value: app
        });
    }

    loadModule(modules) {
        const container = {};

        Object.keys(modules).forEach(module => {
            container[module] = this._initModule(modules[module]);
        });
        return container;
    }

    /**
     * Intance module, e.g. Express, and transfer this, also express extend BaseModule,
     * so instance of Express will have properties: api, pkg, app of prototype
     * @param {*} Module 
     */
    _initModule(Module) {
        return new Module(this);
    }
}