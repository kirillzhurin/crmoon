const Category = require('../models/Category');
const Product = require('../models/Product');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.status(200).json(categories);
  } catch (error) {
    errorHandler(res, error);
  }
}

module.exports.getById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    errorHandler(res, error);
  }
}

module.exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.remove({ _id: id });
    await Product.remove({ category: id });
    res.status(200).json({ id });
  } catch (error) {
    errorHandler(res, error);
  }
}

module.exports.create = async (req, res) => {
  const category = await new Category({
    name: req.body.name,
    description: req.body.description,
    imageSrc: req.file ? req.file.path : '',
    user: req.user.id
  });
  try {
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    errorHandler(res, error);
  }
}

module.exports.update = async (req, res) => {
  const updated = {
    name: req.body.name,
    description: req.body.description
  }

  if (req.file) {
    updated.imageSrc = req.file.path;
  }

  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updated },
      { new: true }
    );
    res.send(category);
  } catch (error) {
    errorHandler(res, error);
  }
}
