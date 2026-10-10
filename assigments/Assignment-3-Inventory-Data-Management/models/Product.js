const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [2, 'Product name must contain at least 2 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [5, 'Description must contain at least 5 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      enum: {
        values: ['Electronics', 'Furniture', 'Groceries', 'Clothing', 'Stationery', 'Other'],
        message: '{VALUE} is not a valid category',
      },
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be non-negative'],
    },
    stock: {
      type: Number,
      required: [true, 'Stock is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      trim: true,
      uppercase: true,
      unique: true,
      minlength: [3, 'SKU must contain at least 3 characters'],
    },
    supplier: {
      type: String,
      trim: true,
      default: 'Unknown',
    },
    reorderLevel: {
      type: Number,
      min: [0, 'Reorder level cannot be negative'],
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
