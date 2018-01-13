const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');

const BaseModule = require('../lib/base/module');

module.exports = class ExpressModule extends BaseModule {
    constructor(app) {
        super(app);
        const port = this.app.config.port;

        this.express = express();
        this.initViews();
        this.initRoutes();
        this.express.listen(port, function () {
            console.log(`Server listening on port: ${port}`);
        });
    }

    initViews() {
        // this.express.set('views', path.join(__dirname, '../', 'main/views'));
        this.express.set('view engine', 'njk');
        nunjucks.configure(path.join(__dirname, '../', 'main/views'), {
            autoescape: true,
            express: this.express
        });
    }

    initRoutes() {
        const router = express.Router();
        const mainRoutes = this.app.main.routes || [];
        const apiRoutes = this.app.api.routes || [];
        const routes = mainRoutes.concat(apiRoutes);

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