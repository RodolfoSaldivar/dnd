import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  appId: process.env.REACT_APP_APP_ID,
  apiKey: process.env.REACT_APP_API_KEY,
  projectId: process.env.REACT_APP_PROJECT_ID,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);

signInWithEmailAndPassword(auth, "mail", "passwrd")
  .then(userCredential => {
    // Signed in
    const user = userCredential.user;
    console.log("%c31 - user: ", "background-color: yellow", user);
    // ...
  })
  .catch(error => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(
      "%c43 - errorMessage: ",
      "background-color: yellow",
      errorMessage,
    );
  });

// signOut(auth).then(() => {
//   // Sign-out successful.
// }).catch((error) => {
//   // An error happened.
// });

const starCountRef = ref(database, "campaign");
onValue(starCountRef, snapshot => {
  const data = snapshot.val();
  console.log("%c21 - data: ", "background-color: yellow", data);
});
