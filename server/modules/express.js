const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const passport = require('passport');

const BaseModule = require('../lib/base/module');

module.exports = class ExpressModule extends BaseModule {
    constructor(app) {
        super(app);
        const port = this.app.config.port;

        this.express = express();
        // Init view and engine
        this.initViews();
        // Passport
        this.express.use(passport.initialize());
        // Static i.e., js,css,font
        this.express.use(express.static(path.join(__dirname, '../', 'static')));
        // Load routes
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
            if (route.interceptors) {
                router[route.method.toLowerCase()](route.path, this.getInterceptors(route.interceptors), this.getAction(route.action));
            } else {
                router[route.method.toLowerCase()](route.path, this.getAction(route.action));
            }
        });
        this.express.use('', router);
    }

    getInterceptors(interceptors) {
        let middlewares = this.app.middlewares;
        let methods;
        let parent = null;
        let wapper = [];

        interceptors.forEach((interceptor) => {
            methods = interceptor.split('.');
            methods.forEach((method) => {
                parent = middlewares;
                middlewares = middlewares[method];
            });
            wapper.push(middlewares.bind(parent));
        });
        return wapper;
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