'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = await request.only(['username', 'email', 'password'])

    const user = await User.create(data)

    return user
  }

  async update ({ params, request, response }) {
    const data = await request.only(['nome', 'password'])

    const user = await User.find(params.id)

    if (!(await user.checkPassword(request.input('password_old')))) {
      return response
        .status(401)
        .send({ error: { message: 'A senha antiga não foi identificada!' } })
    }

    user.merge(data)

    await user.save()

    return user
  }
}

module.exports = UserController
