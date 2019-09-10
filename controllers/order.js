const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
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

module.exports.getById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
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


module.exports.payment = async (req, res) => {
  const {amount, tokenId, orderId} = req.body
  const order = await Order.findById(orderId);
  if (order.paid) {
    res.status(400).json({error: 'Order has already been paid, you cannot do it twice'});
  }
  const charge = await stripe.charges.create({
    amount,
    currency: 'usd',
    description: `Order #${order.order} payment`,
    source: tokenId
  });

  order.paid = true;
  const data = await order.save();
  res.status(200).json(data);
}