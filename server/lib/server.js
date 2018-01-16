const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
// const passport = require('passport');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const expressSession = require('express-session');

// const BaseModule = require('../lib/base/module');

module.exports = class Server {
    init() {
        let args = Array.prototype.slice.call(arguments);
        let arg;
        let opts = {};
        let next;

        while ((arg = args.pop())) {
            if (typeof arg === 'function') {
                next = arg;
            } else {
                opts = arg;
            }
        }

        this.config = opts;
        this.express = express();
        // Init view and engine
        this.initViews();
        // Must use bodyParser, otherwise params nothing
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        // An express.js middleware for validator
        this.express.use(expressValidator());
        // Session
        this.express.use(expressSession({
            resave: true,
            saveUninitialized: true,
            secret: 'secret'
        }));
        // Passport
        // this.express.use(passport.initialize());
        // this.express.use(passport.session());
        // Static i.e., js,css,font
        this.express.use(express.static(path.join(__dirname, '../', 'static')));
        next();
    }

    start() {
        this.express.listen(this.config.port, () => {
            console.log(`Server listening on port: ${this.config.port}`);
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
};