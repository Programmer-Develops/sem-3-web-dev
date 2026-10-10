const express = require('express');
const Product = require('../models/Product');
const { validateProduct, validateProductUpdate } = require('../middlewares/validateProduct');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    let query = {};
    let sort = { createdAt: -1 };

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};

      if (req.query.minPrice) {
        query.price.$gte = Number(req.query.minPrice);
      }

      if (req.query.maxPrice) {
        query.price.$lte = Number(req.query.maxPrice);
      }
    }

    if (req.query.sortBy) {
      sort = {};
      sort[req.query.sortBy] = req.query.sortOrder === 'asc' ? 1 : -1;
    }

    let page = 1;
    let limit = 10;

    if (req.query.page) {
      page = Number(req.query.page);
    }

    if (req.query.limit) {
      limit = Number(req.query.limit);
    }

    const skip = (page - 1) * limit;
    const products = await Product.find(query).sort(sort).skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      page: page,
      limit: limit,
      totalProducts: totalProducts,
      data: products,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/low-stock', async (req, res, next) => {
  try {
    let threshold = 10;

    if (req.query.threshold) {
      threshold = Number(req.query.threshold);
    }

    const products = await Product.find({ stock: { $lte: threshold } }).sort({ stock: 1 });

    res.status(200).json({
      success: true,
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
        },
      },
      { $sort: { totalStock: -1 } },
    ]);

    res.status(200).json({
      success: true,
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
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

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
    if (req.body.quantity === undefined || req.body.quantity < 0) {
      const err = new Error('Quantity is required and must be non-negative.');
      err.statusCode = 400;
      return next(err);
    }

    if (!req.body.type || (req.body.type !== 'restock' && req.body.type !== 'sale' && req.body.type !== 'set')) {
      const err = new Error('Stock type must be restock, sale, or set.');
      err.statusCode = 400;
      return next(err);
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      const err = new Error('Product not found');
      err.statusCode = 404;
      return next(err);
    }

    if (req.body.type === 'restock') {
      product.stock = product.stock + Number(req.body.quantity);
    } else if (req.body.type === 'sale') {
      product.stock = product.stock - Number(req.body.quantity);
    } else {
      product.stock = Number(req.body.quantity);
    }

    if (product.stock < 0) {
      const err = new Error('Stock cannot become negative.');
      err.statusCode = 400;
      return next(err);
    }

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: 'Stock updated successfully',
      data: updatedProduct,
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
