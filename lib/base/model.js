const waterline = require('waterline');

const Base = require('./base');

module.exports = class BaseModel extends Base {
    constructor(app, ns, next) {
        super(app, ns);
        if (this.constructor.name === 'Model') {
            this.app[ns].models = this.loadModule(this.app[ns].models);
            this.waterline = new waterline();
            this.loadSchemas();
            this.waterline.initialize(this.app.config.databases, (err, entry) => {
                if (err) {
                    throw err;
                }
                this.app.orm = entry.collections;
                this.app.connections = entry.connections;
                //Should next in callback, in order to can take `app` real-time, i.e., in `Passport`
                next();
            });
            // next();
        }
    }

    loadSchemas() {
        var schames = this.app[this.ns].models;

        // return Object.values(schames)
        //     .map(entry => {
        //         waterline.Collection.extend(entry.schema())
        //     })
        //     .map(entry => {
        //         this.waterline.loadCollection(entry);
        //     });

        return Object.values(schames)
            .map(schame => waterline.Collection.extend(schame.schema()))
            .map(schame => 
                this.waterline.loadCollection(schame)
            );
    }
};