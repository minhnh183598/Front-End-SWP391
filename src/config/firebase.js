// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ-lGODDySUpAJ3W0M2lNUXZp271oco-Q",
  authDomain: "furryfriendshaven-acfd9.firebaseapp.com",
  projectId: "furryfriendshaven-acfd9",
  storageBucket: "furryfriendshaven-acfd9.appspot.com",
  messagingSenderId: "953872004242",
  appId: "1:953872004242:web:63cc721d6c54af4e5aa24b",
  measurementId: "G-K4PNSL8H5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage};
