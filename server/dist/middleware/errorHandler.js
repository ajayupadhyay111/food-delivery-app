// errorHandler.js
function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log the full error stack
    const statusCode = err.status || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        success: false,
        error: message,
    });
}
export default errorHandler;
