const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
};

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal server error';

  if (err.statusCode) {
    statusCode = err.statusCode;
  }

  if (err.message) {
    message = err.message;
  }

  if (err.code === 11000) {
    message = 'Duplicate value found';
  }

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
