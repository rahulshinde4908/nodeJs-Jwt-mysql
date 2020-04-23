const jwt = require("jsonwebtoken");
const config = require("../auth.config.js");

verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    console.log('req.userId', req.userId,  "decoded.id", decoded.id)
    next();
  });
};


const authJwt = {
  verifyToken: verifyToken
};
module.exports = authJwt;
