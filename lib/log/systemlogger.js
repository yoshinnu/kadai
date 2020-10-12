
const logger = require("./logger.js").system;

module.exports = function (options){
  return function (err, res, req, next) {
    logger.error(err.message);
    next(err);
  };
};