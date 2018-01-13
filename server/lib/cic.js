module.exports = class Cic {
    /**
     * Constructor, initialize some stuff, e.g. controller and models
     * @param {Object} api 
     * @param {Object} pkg 
     */
    constructor(main, api, pkg, config) {
        this.main = main;
        this.api = api;
        this.pkg = pkg;
        this.config = config;

        this.initModuleContainers();
        this.initExternalModules();
    }

    initModuleContainers() {
        const controllers = Object.assign({}, this.main.controllers, this.api.controllers);

        this.controllers = this.initModuleContainer(controllers);
    }

    initModuleContainer(modules) {
        const container = {};

        Object.keys(modules).forEach(module => {
            container[module] = this.initModule(modules[module]);
        });
        return container;
    }

    initExternalModules() {
        const modules = this.pkg.cicModules || [];

        modules
            .map(module => {
                this.initModule(require.main.require(module))
            })
            .sort();
    }

    /**
     * Intance module, e.g. Express, and transfer this, also express extend BaseModule,
     * so instance of Express will have properties: api, pkg, app of prototype
     * @param {*} Module 
     */
    initModule(Module) {
        return new Module(this);
    }
}