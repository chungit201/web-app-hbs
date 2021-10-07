import firebase from 'firebase';
const config =require('./config');

export const firebaseApp =firebase.initializeApp(config.firebaseConfig);

