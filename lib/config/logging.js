
var nconf = require('nconf'),
    winston = module.exports = exports = require('winston');

// Transports
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  level: nconf.get('log_level') || 'info',
  colorize: true,
  prettyPrint: true
});

// Settings
winston.exitOnError = false;
