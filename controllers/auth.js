const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');

module.exports.login = async (req, res) => {
 const { email, password } = req.body;
 try {
  const candidate = await User.findOne({ email });
  if (candidate) {
    const passwordResult = bcrypt.compareSync(password, candidate.password);
    if (passwordResult) {
      const token = jwt.sign({
        fullName: candidate.fullName,
        email,
        userId: candidate._id
      }, keys.jwtKey, {expiresIn: 60 * 60 * 3})
      res.status(200).json({ token })
    } else {
      res.status(401).json({
        message: 'Invalid email or password'
      });
    }
  } else {
    res.status(404).json({
      message: 'User is not found!'
    });
  }
 } catch (error) {
   console.log(error);
 }
 
};

module.exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const candidate = await User.findOne({ email });
    if (candidate) {
      res.status(409).json({
        message: 'This email is already in use.'
      })
    } else {
      const salt = bcrypt.genSaltSync(10);
      const user = new User({ fullName, email, password: bcrypt.hashSync(password, salt) });
      try {
        await user.save();
        res.status(201).json(user);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};