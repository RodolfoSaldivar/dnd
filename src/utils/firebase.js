import { initializeApp } from "firebase/app";
import { useLoggedUserStore } from "stores/loggedUser";
import { getDatabase, ref, onValue, set } from "firebase/database";
import {
  signOut,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

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
const auth = getAuth(app);
const database = getDatabase(app);

//#region Auth related
export const logOutFromFirebase = () => signOut(auth);

export const signIntoFirebase = async (email, password) => {
  try {
    const creds = await signInWithEmailAndPassword(auth, email, password);
    const { uid, metadata } = creds.user;
    return { id: uid, email, metadata };
  } catch (error) {
    return { error: error.code };
  }
};

export const listenIfUserIsLogged = () => {
  onAuthStateChanged(auth, async user => {
    const { uid } = user || {};
    useLoggedUserStore.setState({
      userId: uid || "",
      checkedIfLogged: true,
    });
  });
};
//#endregion

//#region Users related
export const listenToUserById = userId => {
  const dbRef = ref(database, "users/" + userId);
  onValue(dbRef, snapshot => {
    const loggedUser = snapshot.val();
    useLoggedUserStore.setState({ loggedUser });
  });
};

export const updateLastVisitedPage = pageName => {
  const userId = useLoggedUserStore.getState().userId;
  set(ref(database, `users/${userId}/lastVisitedPage`), pageName);
};
//#endregion
