'use strict'

const Model = use('Model')
const moment = require('moment')

class Event extends Model {
  isExpired () {
    return moment()
      .subtract('1', 'days')
      .isAfter(this.date)
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Event
