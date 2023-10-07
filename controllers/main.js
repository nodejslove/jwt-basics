const jwt = require('jsonwebtoken');

const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomAPIError(
      'Username and password is mandatory for login',
      403
    );
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '5min',
  });
  res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provide', 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({
      msg: `Hello ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is: ${
        Math.floor(Math.random() * 100) + 1
      }`,
    });
  } catch (error) {
    throw new CustomAPIError(
      `Not authorized to access this route or Token expired. ${error.message}`,
      401
    );
  }
};

module.exports = {
  login,
  dashboard,
};
