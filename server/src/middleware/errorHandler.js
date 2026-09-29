export function errorHandler(err, req, res, next) {
  console.error('[API Error]:', err);

  const status = err.status || err.statusCode || 500;
  const code = err.code || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'An unexpected error occurred processing your request.';

  res.status(status).json({
    success: false,
    code,
    status,
    message
  });
}
