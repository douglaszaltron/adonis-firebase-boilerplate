'use strict'

const FirebaseAdmin = use('FirebaseAdmin')
const firestore = FirebaseAdmin.firestore()
firestore.settings({ timestampsInSnapshots: true })

class PostController {
  async index () {
    return firestore.collection('posts').get()
      .then((snapshot) => {
        let items = []
        snapshot.forEach((doc) => { items.push({...doc.data(), id: doc.id}) })
        return items
      })
      .catch(async (reason) => { return reason })
  }

  async store ({ request }) {
    let data = request.only(['title', 'body', 'image_url', 'published_at'])
    let ref = firestore.collection('posts')
    return ref.add(data).then(async (doc) => { return {...data, id: doc.id} })
      .catch(async (reason) => { return reason })
  }

  async show ({ params }) {
    let uid = params.id
    return firestore.collection('posts').doc(uid).get()
      .then(async (doc) => { return (!doc.exists) ? { } : {...doc.data(), id: doc.id} })
      .catch(async (reason) => { return reason })
  }

  async update ({ params, request }) {
    let data = request.only(['title', 'body', 'image_url', 'published_at', 'disabled'])
    let uid = params.id
    return firestore.collection('posts').doc(uid).update(data)
      .then(async (doc) => { return {...doc.data(), id: doc.id} })
      .catch(async (reason) => { return reason })
  }

  async destroy ({ params }) {
    let uid = params.id
    return firestore.collection('posts').doc(uid).delete()
      .then(async () => { return {} })
      .catch(async (reason) => { return reason })
  }
}

module.exports = PostController
