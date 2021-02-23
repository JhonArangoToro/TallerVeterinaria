import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDsXN-Bwr2tpiT76TfoCBUMNZkotWokxiw",
    authDomain: "veterinarian-83864.firebaseapp.com",
    projectId: "veterinarian-83864",
    storageBucket: "veterinarian-83864.appspot.com",
    messagingSenderId: "410916508331",
    appId: "1:410916508331:web:aeb348c8e2ab1c08e59dee"
  } 

  export const firebaseApp = firebase.initializeApp(firebaseConfig)