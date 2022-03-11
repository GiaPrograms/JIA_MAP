class ForbiddenException extends Error {
  constructor(...args) {
    super(...args)
    Error.captureStackTrace(this, ForbiddenException)
    this.status = 'Forbidden'
    this.code = '403'
    this.title = 'Forbidden access'
    this.description = this.message
  }
}

module.exports = ForbiddenException