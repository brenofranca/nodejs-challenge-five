'use strict'

const Event = use('App/Models/Event')

class EventController {
  async index ({ params }) {
    const events = await Event.query()
      .where('user_id', params.users_id)
      .orderBy('date', 'asc')
      .fetch()

    return events
  }

  async store ({ params, request, response }) {
    const data = await request.only(['title', 'localization', 'date'])
    const date = request.input('date')

    const countEvents = await Event.query()
      .where('user_id', params.users_id)
      .where('date', date)
      .getCount()

    if (countEvents > 0) {
      return response.status(401).send({
        error: { message: 'Você já possui um evento cadastro para essa data.' }
      })
    }

    const event = await Event.create({ ...data, user_id: params.users_id })

    return event
  }

  async show ({ params }) {
    const event = await Event.findOrFail(params.id)

    return event
  }

  async update ({ params, request, response, auth }) {
    const data = await request.only(['title', 'localization', 'date'])

    const event = await Event.findOrFail(params.id)

    if (event.isExpired()) {
      return response.status(401).send({
        error: { message: 'A data do evento já passou.' }
      })
    }

    if (event.user_id !== auth.user.id) {
      return response.status(401).send({
        error: { message: 'Você não está autorizado a excluir esse evento.' }
      })
    }

    event.merge(data)

    await event.save()

    return event
  }

  async destroy ({ params, auth, response }) {
    const event = await Event.findOrFail(params.id)

    if (event.isExpired()) {
      return response.status(401).send({
        error: { message: 'A data do evento já passou.' }
      })
    }

    if (event.user_id !== auth.user.id) {
      return response.status(401).send({
        error: { message: 'Você não está autorizado a excluir esse evento.' }
      })
    }

    await event.delete()
  }
}

module.exports = EventController
