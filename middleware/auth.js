const jwt = require('jsonwebtoken');

const CustomAPIError = require('../errors/custom-error');

const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provide', 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username, id } = decoded;
    req.user = { username, id };
    next();
  } catch (error) {
    throw new CustomAPIError('Token expires or not provided', 401);
  }
};

module.exports = authenticationMiddleware;
