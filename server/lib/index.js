const Cic = require('./cic');
const Config = require('./config');
const Main = require('../main');
const Api = require('../api');
const Pkg = require('../package.json');

const conf = new Config().config;
/**
 * instantiate Cic
 */
new Cic(Main, Api, Pkg, conf);