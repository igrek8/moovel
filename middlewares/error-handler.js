const showError = process.env.NODE_ENV === "development";

const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    error: {
      name: showError ? err.name : "Internal Server Error",
      message: showError ? err.message : "Something went wrong",
      stack: showError ? err.stack : undefined,
    },
  });
};

module.exports = errorHandler;
