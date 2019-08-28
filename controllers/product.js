const Product = require('../models/Product');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
  try {
    const options = { user: req.user.id };
    const { category } = req.query;
    if (category) {
      options.category = category;
    }
    const products = await Product.find(options);
    res.status(200).json(products);
  } catch (error) {
    errorHandler(res, error);
  }
}

module.exports.getByCategoryId = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.categoryId,
      user: req.user.id
    });
    res.status(200).json(products);  
  } catch (error) {
    errorHandler(res, error);
  }
}

module.exports.create = async (req, res) => {
  const product = new Product({ 
    ...req.body,
    user: req.user.id
  });
  try {
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    errorHandler(res, error);
  }
}

module.exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.remove({ _id: id });
    res.send(id);
  } catch (error) {
    errorHandler(res, error);
  } 
}

module.exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndUpdate(
      { _id: id }, 
      { $set: req.body }, 
      { new: true }
    );
    res.status(200).json(product);
  } catch (error) {
    errorHandler(res, error);
  }
}
