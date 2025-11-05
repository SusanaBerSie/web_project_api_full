class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = InternalServerError;
