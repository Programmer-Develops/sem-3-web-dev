const validateProduct = (req, res, next) => {
  const { name, description, category, price, stock, sku } = req.body;

  if (!name || name.length < 2) {
    return res.status(400).json({ message: 'Name is required and must be at least 2 characters long.' });
  }

  if (!description || description.length < 5) {
    return res.status(400).json({ message: 'Description is required and must be at least 5 characters long.' });
  }

  if (!category) {
    return res.status(400).json({ message: 'Category is required.' });
  }

  if (price === undefined || price < 0) {
    return res.status(400).json({ message: 'Price is required and must be a non-negative number.' });
  }

  if (stock === undefined || stock < 0) {
    return res.status(400).json({ message: 'Stock is required and must be a non-negative number.' });
  }

  if (!sku || sku.length < 3) {
    return res.status(400).json({ message: 'SKU is required and must be at least 3 characters long.' });
  }

  next();
};

const validateProductUpdate = (req, res, next) => {
  if (req.body.name && req.body.name.length < 2) {
    return res.status(400).json({ message: 'Name must be at least 2 characters long.' });
  }

  if (req.body.description && req.body.description.length < 5) {
    return res.status(400).json({ message: 'Description must be at least 5 characters long.' });
  }

  if (req.body.price !== undefined && req.body.price < 0) {
    return res.status(400).json({ message: 'Price must be non-negative.' });
  }

  if (req.body.stock !== undefined && req.body.stock < 0) {
    return res.status(400).json({ message: 'Stock must be non-negative.' });
  }

  if (req.body.sku && req.body.sku.length < 3) {
    return res.status(400).json({ message: 'SKU must be at least 3 characters long.' });
  }

  next();
};

module.exports = {
  validateProduct,
  validateProductUpdate,
};
