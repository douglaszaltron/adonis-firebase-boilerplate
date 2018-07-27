'use strict'

const FirebaseAdmin = use('FirebaseAdmin')

class UserController {
  async index ({ request }) {
    let pageToken = request.input('pageToken')
    let limit = parseInt(request.input('limit', 50))
    return FirebaseAdmin.auth().listUsers(limit, pageToken).then(async (users) => { return users })
  }

  async store ({ request }) {
    let data = request.only(['displayName', 'email', 'password', 'phoneNumber'])

    return FirebaseAdmin.auth().createUser(data)
      .then(async (user) => { return user })
      .catch(async (reason) => { return reason })
  }

  async show ({ params }) {
    let uid = params.id
    return FirebaseAdmin.auth().getUser(uid)
      .then(async (user) => { return user })
      .catch(async (reason) => { return reason })
  }

  async update ({ params, request }) {
    let data = request.only(['displayName', 'email', 'password', 'phoneNumber', 'disabled'])
    let uid = params.id
    return FirebaseAdmin.auth().updateUser(uid, data)
      .then(async (user) => { return user })
      .catch(async (reason) => { return reason })
  }

  async destroy ({ params }) {
    let uid = params.id
    return FirebaseAdmin.auth().deleteUser(uid)
      .then(async (user) => { return user })
      .catch(async (reason) => { return reason })
  }
}

module.exports = UserController
