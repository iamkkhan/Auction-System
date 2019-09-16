// for authentication the tokem
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // verifying the token here

  // verify decode and verify dono krta ha
  // decoded srf decode krta ha k valid64 base ha k nh
  try {
    // to remove the white space and the word bearer in the header value with bearer token_value we use slipt here
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secret');
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Auth Failed!'
    });
  }
};
