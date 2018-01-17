const express = require('express');

const Base = require('./base');

module.exports = class BaseRouter extends Base {
    constructor(app, ns, next) {
        super(app, ns);
        const router = express.Router();
        const routes = app[ns].routes || [];

        routes.forEach(route => {
            if (route.interceptors) {
                router[route.method.toLowerCase()](route.path, this._getInterceptors(route.interceptors), this._getAction(route.action));
            } else {
                router[route.method.toLowerCase()](route.path, this._getAction(route.action));
            }
        });
        app.express.use('', router);
        next();
    }

    _getInterceptors(interceptors) {
        let middlewares = this.app[this.ns].middlewares || {};
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

    _getAction(action) {
        let parent = null;
        let controller = this.app[this.ns].controllers || {};
        let actions = action.split('.');
        
        actions.forEach(accessor => {
            parent = controller;
            controller = controller[accessor];
        });

        return controller.bind(parent);
    }
};