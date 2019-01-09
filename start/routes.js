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

Route.post('sessions', 'SessionController.store').validator('Session')
