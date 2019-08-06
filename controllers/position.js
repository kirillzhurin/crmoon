const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.getByCategoryId = async (req, res) => {
  try {
    const positions = await Position.find({
      category: req.params.categoryId,
      user: req.user.id
    });
    res.status(200).json(positions);  
  } catch (error) {
    errorHandler(res, error);
  }
}

module.exports.remove = (req, res) => {
  res.status(200).json({
    position: 'remove'
  });
}

module.exports.create = (req, res) => {
  res.status(200).json({
    position: 'create'
  });
}

module.exports.update = (req, res) => {
  res.status(200).json({
    position: 'update'
  });
}
