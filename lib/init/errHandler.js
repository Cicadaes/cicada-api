module.exports = class ErrHandler {
    constructor(app, next) {
        app.express.use(function(err, req, res, next) {
            if (err.name == 'UnauthorizedError') {
                res.status(401);
                res.json({code: 1, msg: err.name + ":" + err.message });
            } else {
                res.status(500);
                res.json({code: 1, msg: err.name + ":" + err.message });
            }
        });
        next();
    }
};