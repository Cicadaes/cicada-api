const Controller = require('../../lib/base/controller');

module.exports = class HomeController extends Controller {
    index(req, res) {
        // this.app.orm.user.create({
        //     username: 'admin',
        //     email: 'admin@admin.com',
        //     password: 'admin'
        // }, (err, record) => {
        //     console.log(record);
        //     if (err) return res.status(500).json(err);
        // });
        this.app.orm.user.find({}).then((records) => {
            res.render('home/index', {
                title: 'Cicada API',
                users: records
            });
        });
    }
};