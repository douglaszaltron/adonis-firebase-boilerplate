'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { response, session }) {
    if (error.name === 'HttpException') {
      var errors = {
        'errors': {
          code: error.name,
          message: error.message
        },
        'help': 'douglaszaltron@gmail.com'
      }

      return response.status(error.status).send(errors)
    }

    return super.handle(...arguments)
  }
}

module.exports = ExceptionHandler
