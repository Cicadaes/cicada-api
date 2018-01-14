const App = require('./app');
const Config = require('./config');
const Main = require('../main');
const Api = require('../api');

const conf = new Config().config;
/**
 * instantiate Cic
 */
new App(Main, Api, conf);