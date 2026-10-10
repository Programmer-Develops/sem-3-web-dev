const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';

  if (err.name === 'ValidationError') {
    message = Object.values(err.errors)
      .map((fieldError) => fieldError.message)
      .join(', ');
  }

  if (err.name === 'CastError') {
    message = `Invalid ${err.path}: ${err.value}`;
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value for ${field}: ${err.keyValue[field]}`;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
