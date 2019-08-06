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

module.exports.remove = async (req, res) => {
  const id = req.params.id;
  try {
    await Position.remove({ _id: id });
    res.send(id);
  } catch (error) {
    errorHandler(res, error);
  } 
}

module.exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const position = await Position.findByIdAndUpdate(
      { _id: id }, 
      req.body, 
      { new: true }
    );
    res.status(200).json(position);
  } catch (error) {
    errorHandler(res, error);
  }
}
