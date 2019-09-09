const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  email: String,
  phone: String,
  name: String,
  surname: String,
  city: String,
  address: String,
  paid: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  order: {
    type: Number,
    required: true
  },
  list: [
    {
      title: {
        type: String
      },
      color: {
        type: String
      },
      size: {
        type: String
      },
      quantity: {
        type: Number
      },
      price: {
        type: Number
      }
    }
  ],
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  }
});

module.exports = mongoose.model('orders', ordersSchema);