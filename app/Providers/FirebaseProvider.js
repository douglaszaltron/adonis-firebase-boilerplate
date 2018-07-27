'use strict'

const {ServiceProvider} = require('@adonisjs/fold')
const client = require('firebase')

class FirebaseProvider extends ServiceProvider {
  register () {
    this.app.singleton('Firebase', () => {
      const Config = this.app.use('Adonis/Src/Config')

      const config = {
        apiKey: Config.get('firebase.apiKey'),
        authDomain: Config.get('firebase.authDomain'),
        databaseURL: Config.get('firebase.databaseURL'),
        storageBucket: Config.get('firebase.storageBucket')
      }

      return client.initializeApp(config)
    })

    this.app.alias('Firebase', 'Firebase')
  }
}

module.exports = FirebaseProvider
