'use strict'

const Antl = use('Antl')

class EventShare {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = EventShare
