import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB-ZtV8NdySeymOJp35S495zEMvwLN_lI8',
  authDomain: 'hozidreys.firebaseapp.com',
  projectId: 'hozidreys',
  storageBucket: 'hozidreys.firebasestorage.app',
  messagingSenderId: '526498218427',
  appId: '1:526498218427:web:e1281e89803784952e449e',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
