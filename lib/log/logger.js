const log4js = require("log4js");
const levels = require("log4js/lib/levels").levels;
const logconfig = require("../../config/log4js.config.js");
let console, system, application,access;

log4js.configure(logconfig);

console = log4js.getLogger();
system  = log4js.getLogger("system");
access = log4js.getLogger("access");

//アプリケーションロガー拡張
const ApplicationLogger = function () {
  this.logger = log4js.getLogger("application");
};
const proto = ApplicationLogger.prototype;
for (let level of levels) {
  level = level.toString().toLowerCase();
  proto[level] = (function (level) {
    return function (key, message) {
      const logger = this.logger;
      logger.addContext("key", key);
      logger[level](message);
    };
  })(level);
}

application = new ApplicationLogger();


module.exports = {
  console,
  system,
  application,
  access
};