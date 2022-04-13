import "./App.css";
import { useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  connectAuthEmulator,
  getIdToken,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import * as Realm from "realm-web";

const firebaseConfig = {
  apiKey: "AIzaSyAM3QFSb5DA_phIm0hKCIyQz9QwMZEWPus",
  authDomain: "realm-test-edecb.firebaseapp.com",
  projectId: "realm-test-edecb",
  storageBucket: "realm-test-edecb.appspot.com",
  messagingSenderId: "968419352263",
  appId: "1:968419352263:web:1235decf0c0d8ea399e8e2",
  measurementId: "G-L5K1MRKFRK",
};

const firebaseApp = initializeApp(firebaseConfig);
const realmApp = new Realm.App({ id: "myappcopy-kecbo" });

const auth = getAuth(firebaseApp);
// connectAuthEmulator(auth, "http://localhost:9099");

onAuthStateChanged(auth, (user) => {
  // Check for user status
});

function createUser(email, password) {
  console.log("create user!");
  console.log({ email, password });
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      console.log(userCredential);
      // Signed in
      const user = userCredential.user;
    })
    .catch((error) => {
      console.log(error);
      // ..
    });
}

function signOutUser() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}

function signInUser(email, password) {
  console.log({ email, password });

  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      console.log(userCredential);
      // Signed in
      const user = userCredential.user;
      const token = await getIdToken(user);
      const creds = Realm.Credentials.jwt(token);
      const realmUser = await realmApp.logIn(creds);
      console.log(realmUser);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

function App() {
  const [formState, setFormState] = useState({});
  function onInputChange(e) {
    const { name } = e.target;
    const newFormState = { ...formState };
    newFormState[name] = e.target.value;
    setFormState(newFormState);
  }
  function signUp(e) {
    e.preventDefault();
    createUser(formState.email, formState.password);
  }
  function logIn(e) {
    e.preventDefault();
    signInUser(formState.email, formState.password);
  }

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <h2>sign up</h2>
          <input type="email" name="email" onChange={onInputChange}></input>
          <input
            type="password"
            name="password"
            onChange={onInputChange}
          ></input>
          <button type="button" onClick={signUp}>
            log in
          </button>
        </form>
        <form>
          <h2>log in</h2>
          <input type="email" name="email" onChange={onInputChange}></input>
          <input
            type="password"
            name="password"
            onChange={onInputChange}
          ></input>
          <button type="button" onClick={logIn}>
            sign up
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;
