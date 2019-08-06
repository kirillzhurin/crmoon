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

module.exports.create = async (req, res) => {
  const { name, cost, category } = req.body;
  try {
    const position = new Position({ 
      name, 
      cost, 
      category, 
      user: req.user.id
    }).save();
    res.status(200).json(position);
  } catch (error) {
    errorHandler(res, error);
  }
}

module.exports.remove = (req, res) => {
  res.status(200).json({
    position: 'remove'
  });
}

module.exports.update = (req, res) => {
  res.status(200).json({
    position: 'update'
  });
}
