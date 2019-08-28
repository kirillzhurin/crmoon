const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

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
    res.send(orders)
  } catch (error) {
    errorHandler(res, error);
  }
}

module.exports.create = async (req, res) => {
  const { list } = req.body;
  const user = req.user.id;
  try {
    const lastOrder = await Order.findOne({ user }).sort({ date: -1 });
    const maxOrder = lastOredr ? lastOrder.order + 1 : 0
    const order = await new Order({
      list,
      user,
      order: maxOrder
    }).save();
    res.status(201).json(order);
  } catch (error) {
    errorHandler(res, error);
  }
}