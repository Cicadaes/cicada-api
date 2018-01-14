const path = require('path');

module.exports = class App {
    /**
     * Constructor, initialize some stuff, e.g. controller and models
     * @param {Object} api 
     * @param {Object} pkg 
     */
    constructor(main, api, config) {
        this.main = main;
        this.api = api;
        this.config = config;

        this.initModuleContainers();
        this.initExternalModules();
    }

    initModuleContainers() {
        const controllers = Object.assign({}, this.main.controllers, this.api.controllers);
        const models = Object.assign({}, this.main.models);

        this.controllers = this.initModuleContainer(controllers);
        this.schames = this.initModuleContainer(models);
    }

    initModuleContainer(modules) {
        const container = {};

        Object.keys(modules).forEach(module => {
            container[module] = this.initModule(modules[module]);
        });
        return container;
    }

    initExternalModules() {
        const modules = this.config.modules || [];

        modules
            .map(module => {
                this.initModule(require.main.require(path.join(__dirname, '..', 'modules' , module)))
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