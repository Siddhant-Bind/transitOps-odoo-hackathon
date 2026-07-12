import AppError from "../utils/AppError.js";

export const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }

  // Production Error Handling
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Handle express-validator errors explicitly if needed
  if (err.array) {
      return res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: err.array()
      });
  }

  console.error("ERROR 💥", err);
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
