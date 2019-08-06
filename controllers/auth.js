const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports.login = (req, res) => {
  res.status(200).json({
    email: req.body.email,
    password: req.body.password
  });
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