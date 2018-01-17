const Controller = require('../../lib/init/main/controller');

module.exports = class HomeController extends Controller {
    index(req, res) {
        res.render('home/index', {
            title: 'Mock API'
        });
    }
};