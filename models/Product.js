const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cost: {
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
    type: String,
  },
  shortDescription: {
    type: String
  },
  fullDescription: {
    type: String
  },
  size: {
    type: String,
    enum: ['xs', 's', 'm', 'l', 'xl']
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