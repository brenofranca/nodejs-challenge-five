'use strict'

const Mail = use('Mail')

class SendEmailEventShared {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'SendEmailEventShared-job'
  }

  async handle (data) {
    const { email } = data

    await Mail.send('emails.event_shared', { ...data }, async message => {
      message
        .to(email)
        .from('sites.brenofranca@gmail.com', 'Breno França | FBSystems')
        .subject('Evento compartilhado com você!')
    })
  }
}

module.exports = SendEmailEventShared
