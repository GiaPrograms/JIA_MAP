class UnauthorizedException extends Error {
  constructor(...args) {
    super(...args)
    Error.captureStackTrace(this, UnauthorizedException)
    this.status = 'Unauthorized'
    this.code = '401'
    this.title = 'Authentication failed'
    this.description = this.message
  }
}

module.exports = UnauthorizedException