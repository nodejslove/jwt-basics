class CustomAPIError extends Error {
  constructor(
    message = 'Something went wrong try again later.',
    statusCode = 500
  ) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = CustomAPIError;
