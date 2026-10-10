const createValidationError = (message) => {
  const err = new Error(message);
  err.statusCode = 400;
  return err;
};

const validateProduct = (req, res, next) => {
  const { name, description, category, price, stock, sku, supplier, reorderLevel } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return next(createValidationError('Product name is required and must contain at least 2 characters.'));
  }

  if (!description || typeof description !== 'string' || description.trim().length < 5) {
    return next(createValidationError('Description is required and must contain at least 5 characters.'));
  }

  if (!category || typeof category !== 'string') {
    return next(createValidationError('Category is required.'));
  }

  if (price === undefined || Number(price) < 0) {
    return next(createValidationError('Price is required and must be a non-negative number.'));
  }

  if (stock === undefined || Number(stock) < 0) {
    return next(createValidationError('Stock is required and must be a non-negative number.'));
  }

  if (!sku || typeof sku !== 'string' || sku.trim().length < 3) {
    return next(createValidationError('SKU is required and must contain at least 3 characters.'));
  }

  if (supplier !== undefined && (typeof supplier !== 'string' || supplier.trim().length === 0)) {
    return next(createValidationError('Supplier must be a valid string when provided.'));
  }

  if (reorderLevel !== undefined && Number(reorderLevel) < 0) {
    return next(createValidationError('Reorder level must be a non-negative number.'));
  }

  req.body.name = name.trim();
  req.body.description = description.trim();
  req.body.category = category.trim();
  req.body.sku = sku.trim().toUpperCase();
  req.body.price = Number(price);
  req.body.stock = Number(stock);
  req.body.reorderLevel = reorderLevel === undefined ? 0 : Number(reorderLevel);

  next();
};

const validateProductUpdate = (req, res, next) => {
  const allowedFields = ['name', 'description', 'category', 'price', 'stock', 'sku', 'supplier', 'reorderLevel'];
  const invalidFields = Object.keys(req.body).filter((field) => !allowedFields.includes(field));

  if (invalidFields.length > 0) {
    return next(createValidationError(`Invalid field(s): ${invalidFields.join(', ')}`));
  }

  if (req.body.name !== undefined && (typeof req.body.name !== 'string' || req.body.name.trim().length < 2)) {
    return next(createValidationError('Product name must contain at least 2 characters.'));
  }

  if (req.body.description !== undefined && (typeof req.body.description !== 'string' || req.body.description.trim().length < 5)) {
    return next(createValidationError('Description must contain at least 5 characters.'));
  }

  if (req.body.category !== undefined && (typeof req.body.category !== 'string' || req.body.category.trim().length === 0)) {
    return next(createValidationError('Category must be a non-empty string.'));
  }

  if (req.body.price !== undefined && Number(req.body.price) < 0) {
    return next(createValidationError('Price must be a non-negative number.'));
  }

  if (req.body.stock !== undefined && Number(req.body.stock) < 0) {
    return next(createValidationError('Stock must be a non-negative number.'));
  }

  if (req.body.sku !== undefined && (typeof req.body.sku !== 'string' || req.body.sku.trim().length < 3)) {
    return next(createValidationError('SKU must contain at least 3 characters.'));
  }

  if (req.body.reorderLevel !== undefined && Number(req.body.reorderLevel) < 0) {
    return next(createValidationError('Reorder level must be a non-negative number.'));
  }

  if (req.body.name) req.body.name = req.body.name.trim();
  if (req.body.description) req.body.description = req.body.description.trim();
  if (req.body.category) req.body.category = req.body.category.trim();
  if (req.body.sku) req.body.sku = req.body.sku.trim().toUpperCase();

  if (req.body.price !== undefined) req.body.price = Number(req.body.price);
  if (req.body.stock !== undefined) req.body.stock = Number(req.body.stock);
  if (req.body.reorderLevel !== undefined) req.body.reorderLevel = Number(req.body.reorderLevel);

  next();
};

module.exports = {
  validateProduct,
  validateProductUpdate,
};
