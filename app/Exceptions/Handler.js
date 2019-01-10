'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

class ExceptionHandler extends BaseExceptionHandler {
  async handle (error, { request, response }) {
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages)
    }
    return response.status(500).send({ error: error.message })
  }

  async report (error, { request }) {}
}

module.exports = ExceptionHandler
