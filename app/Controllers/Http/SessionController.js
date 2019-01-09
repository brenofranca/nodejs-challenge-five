'use strict'

const User = use('App/Models/User')

class SessionController {
  async store ({ request, auth }) {
    const { email, password } = request.all()

    const user = await User.findBy({ email })

    const credentials = await auth.attempt(email, password)

    return {
      user,
      credentials
    }
  }
}

module.exports = SessionController
