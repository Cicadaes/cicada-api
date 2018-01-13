const express = require('express');

const BaseModule = require('../lib/base/module');

module.exports = class ExpressModule extends BaseModule {
    constructor(app) {
        const port = app.config.server.port || 3030;

        super(app);
        this.express = express();
        this.initRoutes();
        this.express.listen(port, function () {
            console.log(`Server listening on port: ${port}`);
        });
    }

    initRoutes() {
        const router = express.Router();
        const routes = this.app.config.server.routes || [];

        routes.forEach(route => {
            router[route.method.toLowerCase()](route.path, this.getAction(route.action));
        });
        this.express.use('', router);
    }

    getAction(action) {
        let parent = null;
        let controller = this.app.controllers;
        let actions = action.split('.');
        
        actions.forEach(accessor => {
            parent = controller;
            controller = controller[accessor];
        });

        return controller.bind(parent);
    }
};