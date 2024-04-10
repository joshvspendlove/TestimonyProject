const { isUndefined } = require("./helper")

exports.verifySession = function (req, res, next) {
    if (isUndefined(req.session.ipaddress)) {
      req.session.ipaddress = req.socket.remoteAddress;
      console.log(`New Session Started - ${req.session.ipaddress}`);
    } else if (req.session.ipaddress !== req.socket.remoteAddress) {
      req.session.destroy();
    }
    next();
  };
  
  exports.verifyLoggedIn = function (req, res, next) {
    if (isUndefined(req.session.loggedin) || !req.session.loggedin) {
      res.status(401).json({
        status: "fail",
        message: 'An error occured',
        error: "Unauthorized request"
      });
    } else  {
      next();
    }
  };