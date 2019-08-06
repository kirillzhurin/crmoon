const Category = require('../models/Category');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
  try {
    const categories = Category.find({ user: req.user.id });
    res.status(200).json(categories);
  } catch (error) {
    errorHandler(res, error);
  }
}

module.exports.getById = (req, res) => {
  res.status(200).json({
    category: 'get by id'
  });
}

module.exports.remove = (req, res) => {
  res.status(200).json({
    category: 'remove'
  });
}

module.exports.create = (req, res) => {
  res.status(200).json({
    category: 'create'
  });
}

module.exports.update = (req, res) => {
  res.status(200).json({
    category: 'update'
  });
}
