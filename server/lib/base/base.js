module.exports = class Base {
    /**
     * Assign instance of Cic to this
     * @param {*} app 
     */
    constructor(app) {
        this.defineProp(app);
    }

    defineProp(app) {
        Object.defineProperty(this, 'app', {
            enumerable: false,
            value: app
        });
    }
}