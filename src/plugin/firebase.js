import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

if (!firebase.apps.length) { // 初期化が複数回実行されることを防ぐ
  const config = {
    apiKey: 'AIzaSyBcH3YbCVp1YN6vZhe5WS5NGb9pHlQnfRk',
    authDomain: 'ywolf-30e74.firebaseapp.com',
    databaseURL: 'https://ywolf-30e74.firebaseio.com',
    projectId: 'ywolf-30e74',
    storageBucket: 'ywolf-30e74.appspot.com',
    messagingSenderId: '409889739659',
    appId: '1:409889739659:web:7c30fc03bdc5731b50158e',
    measurementId: 'G-FFZ6XEZQSS',
  }
  firebase.initializeApp(config)
}
const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

export default db
