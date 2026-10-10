const express = require('express');
const Product = require('../models/Product');
const { validateProduct, validateProductUpdate } = require('../middlewares/validateProduct');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const filters = {};
    const sortField = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    if (req.query.category) {
      filters.category = { $regex: new RegExp(req.query.category, 'i') };
    }

    if (req.query.minPrice || req.query.maxPrice) {
      filters.price = {};

      if (req.query.minPrice) {
        filters.price.$gte = Number(req.query.minPrice);
      }

      if (req.query.maxPrice) {
        filters.price.$lte = Number(req.query.maxPrice);
      }
    }

    if (req.query.inStock === 'true') {
      filters.stock = { $gt: 0 };
    }

    if (req.query.search) {
      filters.$or = [
        { name: { $regex: new RegExp(req.query.search, 'i') } },
        { description: { $regex: new RegExp(req.query.search, 'i') } },
      ];
    }

    const [products, totalProducts] = await Promise.all([
      Product.find(filters).sort({ [sortField]: sortOrder }).skip(skip).limit(limit),
      Product.countDocuments(filters),
    ]);

    res.status(200).json({
      success: true,
      page,
      limit,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      data: products,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/low-stock', async (req, res, next) => {
  try {
    const threshold = Number(req.query.threshold) || 10;

    const products = await Product.find({ stock: { $lte: threshold } }).sort({ stock: 1 });

    res.status(200).json({
      success: true,
      threshold,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/summary/category', async (req, res, next) => {
  try {
    const summary = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          totalProducts: { $sum: 1 },
          totalStock: { $sum: '$stock' },
          totalValue: { $sum: { $multiply: ['$price', '$stock'] } },
          averagePrice: { $avg: '$price' },
        },
      },
      {
        $project: {
          category: '$_id',
          totalProducts: 1,
          totalStock: 1,
          totalValue: 1,
          averagePrice: { $round: ['$averagePrice', 2] },
          _id: 0,
        },
      },
      { $sort: { totalStock: -1 } },
    ]);

    res.status(200).json({
      success: true,
      count: summary.length,
      data: summary,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      const err = new Error('Product not found');
      err.statusCode = 404;
      return next(err);
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});

router.post('/', validateProduct, async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', validateProductUpdate, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      const err = new Error('Product not found');
      err.statusCode = 404;
      return next(err);
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/stock', async (req, res, next) => {
  try {
    const { quantity, type } = req.body;

    if (quantity === undefined || Number(quantity) < 0) {
      const err = new Error('Quantity is required and must be a non-negative number.');
      err.statusCode = 400;
      return next(err);
    }

    if (!type || !['restock', 'sale', 'set'].includes(type)) {
      const err = new Error('Stock type must be one of: restock, sale, set.');
      err.statusCode = 400;
      return next(err);
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      const err = new Error('Product not found');
      err.statusCode = 404;
      return next(err);
    }

    const numericQuantity = Number(quantity);

    if (type === 'restock') {
      product.stock += numericQuantity;
    } else if (type === 'sale') {
      product.stock -= numericQuantity;
    } else {
      product.stock = numericQuantity;
    }

    if (product.stock < 0) {
      const err = new Error('Stock cannot become negative.');
      err.statusCode = 400;
      return next(err);
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Stock updated successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      const err = new Error('Product not found');
      err.statusCode = 404;
      return next(err);
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
