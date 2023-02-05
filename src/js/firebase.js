import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCZlZH1o5DXSHjQioekz_yL8QXhhhqmjCM',
  authDomain: 'noteballs-8d86f.firebaseapp.com',
  projectId: 'noteballs-8d86f',
  storageBucket: 'noteballs-8d86f.appspot.com',
  messagingSenderId: '604019245871',
  appId: '1:604019245871:web:3c8c26d648f570aae017da'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db
}