const rateLimit = require('express-rate-limit');

module.exports.limitedRequest = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
