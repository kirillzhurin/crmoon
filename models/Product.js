const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  images: [
    {
      imageSrc: {
        type: String
      }
    }
  ],
  color: {
    type: String
  },
  shortDescription: {
    type: String
  },
  fullDescription: {
    type: String
  },
  size: {
    type: String
  },
  category: {
    ref: 'categories',
    type: Schema.Types.ObjectId
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  }
});

module.exports = mongoose.model('products', productSchema);