'use strict'

const {ServiceProvider} = require('@adonisjs/fold')
const admin = require('firebase-admin')

class FirebaseAdminProvider extends ServiceProvider {
  register () {
    this.app.singleton('FirebaseAdmin', () => {
      const Config = this.app.use('Adonis/Src/Config')

      const config = {
        credential: Config.get('firebase.credential'),
        databaseURL: Config.get('firebase.databaseURL'),
        storageBucket: Config.get('firebase.storageBucket')
      }

      config.credential = admin.credential.cert(config.credential)

      return admin.initializeApp(config)
    })

    this.app.alias('FirebaseAdmin', 'FirebaseAdmin')
  }
}

module.exports = FirebaseAdminProvider
