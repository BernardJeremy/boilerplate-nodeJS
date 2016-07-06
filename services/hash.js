const crypto = require('crypto');

module.exports.sha256 = function (str, secret) {
  return crypto.createHmac('sha256', secret)
                     .update(str)
                     .digest('hex');
};
