module.exports = class ErrHandler {
    constructor(app, next) {
        app.express.use(function(err, req, res, next) {
            if (err.name == 'UnauthorizedError') {
                res.status(401);
                res.json({code: 1, msg: err.name + ":" + err.message });
            } else if (err.msg) {
                // i.e. 
                // Invalid username or password.
                // Email demo13@demo.com not found.
                res.json({code: 1, msg: err.msg});
            } else {
                res.status(500);
                res.json({code: 1, msg: err.name + ":" + err.message });
            }
        });
        next();
    }
};