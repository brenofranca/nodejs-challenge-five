'use strict'

const Model = use('Model')
const moment = require('moment')

class Event extends Model {
  static boot () {
    super.boot()

    this.addHook('afterFind', async instance => {
      instance.date = moment(instance.date).format('DD/MM/YYYY HH:mm')
    })
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  isExpired () {
    return moment()
      .subtract('1', 'days')
      .isAfter(this.date)
  }
}

module.exports = Event
