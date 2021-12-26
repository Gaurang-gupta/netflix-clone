// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyB4QxUiyO_c1UvQXcAGq0Z5EBe3JWzZeA4",
  authDomain: "netflix-clone-7a9e5.firebaseapp.com",
  projectId: "netflix-clone-7a9e5",
  storageBucket: "netflix-clone-7a9e5.appspot.com",
  messagingSenderId: "396201066389",
  appId: "1:396201066389:web:3a8bc01f93e8e286db009c",
  measurementId: "${config.measurementId}"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;