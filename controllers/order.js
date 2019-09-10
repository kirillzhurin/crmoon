const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');
const R = require('ramda');

module.exports.getAll = async (req, res) => {
  const { offset, limit, start, end, order } = req.query;
  const query = {
    user: req.user.id
  };

  if (start) {
    query.date = {
      $gte: start
    }
  }

  if (end) {
    if (!query.date) {
      query.date = {};
    }
    query.date['$lte'] = end
  }

  if (order) {
    query.order = +order;
  }

  try {
    const orders = await Order
      .find(query)
      .sort({ date: -1 })
      .skip(+offset)
      .limit(+limit);
    res.send(orders);
  } catch (error) {
    errorHandler(res, error);
  }
}

module.exports.create = async (req, res) => {
  const user = req.user.id;
  const data = R.pick(['name', 'surname', 'email', 'city', 'address', 'phone', 'list',], req.body);
  try {
    const lastOrder = await Order.findOne({ user }).sort({ date: -1 });
    const maxOrder = lastOrder ? lastOrder.order + 1 : 0
    const order =  new Order({
      ...data,
      user,
      order: maxOrder
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    errorHandler(res, error);
  }
}

module.exports.remove = async (req, res) => {
  const user = req.user.id;
  const { id } = req.params;
  try {
    await Order.remove({ _id: id });
    res.status(200).json({ id });
  } catch (error) {
    errorHandler(res, error);
  }
}