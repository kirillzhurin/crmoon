const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async (req, res) => {
 const { email, password } = req.body;
 try {
  const candidate = await User.findOne({ email });
  if (candidate) {
    const passwordResult = bcrypt.compareSync(password, candidate.password);
    if (passwordResult) {
      const token = jwt.sign({
        username: candidate.username,
        email,
        userId: candidate._id
      }, keys.jwtKey, {expiresIn: 60 * 60 * 3})
      res.status(200).json({ token, message: 'You have been successfully logged in.' })
    } else {
      res.status(401).json({
        message: 'Login/Email combination is not correct, please try again.'
      });
    }
  } else {
    res.status(404).json({
      message: 'User is not found!'
    });
  }
 } catch (error) {
  errorHandler(res, error);
 }
};

module.exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const candidate = await User.findOne({ email });
    if (candidate) {
      res.status(409).json({
        message: 'This email is already in use.'
      })
    } else {
      const salt = bcrypt.genSaltSync(10);
      const user = new User({ username, email, password: bcrypt.hashSync(password, salt) });
      try {
        await user.save();
        res.status(201).json({message: 'You have been successfully registered.'});
      } catch (error) {
        errorHandler(res, error);
      }
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.logout = (req, res) => {
  req.logout();
  res.send();
}