const NotFoundHandler = (req, res, next) => {
  const error = new Error("route not found");
  res.status(404); // set status to 404
  next(error); // pass error to next(error handler)
};

const ErrorHandler = (error, req, res, next) => {
  // set status code to 500 if it is not set as it is server error
  if (res.statusCode === 200 || !res.statusCode) res.status(500);
  res.json({ error: error.message });
};

module.exports = {
  NotFoundHandler,
  ErrorHandler,
};
