import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD7xia3-B6wBT1w9gk91ag-iwDLnGY9szA",
    authDomain: "esquelahorra.firebaseapp.com",
    projectId: "esquelahorra",
    storageBucket: "esquelahorra.firebasestorage.app",
    messagingSenderId: "335694867756",
    appId: "1:335694867756:web:f766f63de172f069b2d089",
    measurementId: "G-PSXG4CYZJN"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);