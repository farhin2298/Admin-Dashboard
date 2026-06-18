// Keeps async controller errors flowing through the central Express error handler.
export default function asyncHandler(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}
