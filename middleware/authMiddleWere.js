const jwt = require('jsonwebtoken');
const {User} = require('../models');
const jwtSecret = process.env.jwt_secret;

const auth = async (req, res, next) => {

  const token = req.header('Authorization');

  console.log("token",token)
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  let bearerToken = '';

  if (token) {
    bearerToken = token.split(' ').pop();
  }

  if (!bearerToken) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }
  try {
    console.log("bearerToken",bearerToken)
    const decoded = jwt.verify(bearerToken, jwtSecret);
    console.log("decoded",decoded)
    const { exp: iat, sub: id } = decoded;
    const isExpired = Date.now() > iat;
    console.log("isExpired",isExpired)
    if (isExpired) {
      return res
        .status(401)
        .json({ message: 'Access denied. Token is expired.' });
    }

   const user = await User.findByPk(decoded.id);

    console.log("user",user)
    if (!user) {
      return res.status(401).json({ message: 'Access denied' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
}

module.exports = auth;
