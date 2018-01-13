const Cic = require('./cic');
const Api = require('../api');
const Pkg = require('../package.json');
/**
 * instantiate Cic
 */
new Cic(Api, Pkg);