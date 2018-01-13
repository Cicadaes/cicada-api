const Controller = require('../../lib/base/controller');

module.exports = class HomeController extends Controller {
    index(req, res) {
        res.render('home/index', {
            title: 'Cicada API'
        });
    }
};