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
}