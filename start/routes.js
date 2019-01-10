'use strict'

const Route = use('Route')

Route.resource('users', 'UserController')
  .apiOnly()
  .middleware(new Map([[['users.update', 'users.delete'], ['auth']]]))
  .validator(
    new Map([
      [['users.store'], ['UserStore']],
      [['users.update'], ['UserUpdate']]
    ])
  )

Route.resource('users.events', 'EventController')
  .apiOnly()
  .middleware(['auth'])
  .validator(
    new Map([
      [['users.events.store'], ['Event']],
      [['users.events.update'], ['Event']]
    ])
  )

Route.post('events/:id/share', 'EventShareController.store')
  .middleware(['auth'])
  .validator('EventShare')
Route.post('sessions', 'SessionController.store').validator('Session')
