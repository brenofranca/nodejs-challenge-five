'use strict'

const Kue = use('Kue')
const Job = use('App/Jobs/SendEmailEventShared')
const Event = use('App/Models/Event')

class EventShareController {
  async store ({ params, request, response, auth }) {
    const email = request.input('email')

    const { name } = auth.user

    const event = await Event.findOrFail(params.id)

    Kue.dispatch(Job.key, { email, name, event }, { attempts: 3 })

    return event
  }
}

module.exports = EventShareController
