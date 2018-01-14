const waterline = require('waterline');

const BaseModule = require('../lib/base/base');

module.exports = class WaterlineModule extends BaseModule {
    constructor(app) {
        super(app);
        this.waterline = new waterline();
        this.loadSchemas();
        this.waterline.initialize(this.app.config.databases, (err, entry) => {
            if (err) {
                throw err;
            }
            this.app.orm = entry.collections;
            this.app.connections = entry.connections;
        });
    }

    loadSchemas() {
        var schames = this.app.schames;

        // return Object.values(schames)
        //     .map(entry => {
        //         waterline.Collection.extend(entry.schema())
        //     })
        //     .map(entry => {
        //         this.waterline.loadCollection(entry);
        //     });

        return Object.values(schames)
            .map(entry => waterline.Collection.extend(entry.schema()))
            .map(entry => 
                this.waterline.loadCollection(entry)
            );
    }
}