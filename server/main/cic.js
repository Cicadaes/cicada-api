module.exports = class Cic {
    /**
     * Constructor, initialize some stuff, e.g. controller and models
     * @param {Object} api 
     * @param {Object} pkg 
     */
    constructor(api, pkg) {
        this.api = api;
        this.pkg = pkg;

        this.initModuleContainers();
        this.initExternalModules();
    }

    initModuleContainers() {
        this.controllers = this.initModuleContainer(this.api.controllers);
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

    /**
     * Getter by app.config return api.config
     */
    get config() {
        return this.api.config;
    }
}