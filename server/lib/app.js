const path = require('path');
const Server = require('./server');
const Init = require('./init');

module.exports = class App {
    /**
     * Constructor, initialize some stuff, e.g. controller and models
     * @param {Object} api 
     * @param {Object} pkg 
     */
    constructor(main, api, config) {
        let server;

        this.main = main;
        this.api = api;
        this.config = config;

        server = new Server();
        
        server.init(config, () => {
            this.express = server.express;
            new Init(this, () => {
                server.start();
            });
            
        });
    }

    init() {
        this.initModuleContainers();
    }

    initModuleContainers() {
        const middlewares = Object.assign({}, this.main.middlewares);
        const controllers = Object.assign({}, this.main.controllers, this.api.controllers);
        const models = Object.assign({}, this.main.models);

        this.middlewares = this.initModuleContainer(middlewares);
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

    /**
     * Intance module, e.g. Express, and transfer this, also express extend BaseModule,
     * so instance of Express will have properties: api, pkg, app of prototype
     * @param {*} Module 
     */
    initModule(Module) {
        return new Module(this);
    }
}