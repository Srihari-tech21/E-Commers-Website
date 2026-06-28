const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: 0
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Cricket', 'Football', 'Cycling', 'Running', 'Basketball', 'Table Tennis', 'Badminton', 'Hockey', 'Tennis', 'Kabaddi', 'Swimming', 'Fitness & Gym', 'Volleyball', 'Handball', 'Baseball', 'Rugby']
  },
  sport: {
    type: String,
    required: [true, 'Please provide a sport'],
    enum: ['Cricket', 'Football', 'Cycling', 'Running', 'Basketball', 'Table Tennis', 'Badminton', 'Hockey', 'Tennis', 'Kabaddi', 'Swimming', 'Fitness & Gym', 'Volleyball', 'Handball', 'Baseball', 'Rugby']
  },
  skillLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Professional'],
    default: 'Beginner'
  },
  ageGroup: {
    type: String,
    enum: ['Kids', 'Youth', 'Adult', 'Senior'],
    default: 'Adult'
  },
  productType: {
    type: String,
    trim: true
  },
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: 0,
    default: 0
  },
  images: [{
    type: String
  }],
  brand: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: String,
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
