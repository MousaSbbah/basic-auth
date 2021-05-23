'use strict';

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err) {
    res.status(500).json({
      status: err.status || 500,
      message: err.message || 'Something Went Wrong',
      route: req.path,
    });
  }
};
