const jwt = require('jsonwebtoken');

const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomAPIError('Username and password is mandatory for login', 401);
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '5min' });
  res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is: ${randomNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
