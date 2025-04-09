// This is a utility function to handle async errors in Express.js.

// It uses Promise.resolve to handle the request handler.
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
};

// Using try catch block to handle errors in async functions
// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     res.status(error.status || 500).json({
//       success: false,
//       message: error.message || "Internal Server Error",
//     });
//     next(error);
//   }
// };

export { asyncHandler };
