import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyD9WEwYy9tUo_gG7P5lwCuIt4aT-LghobM",
  authDomain: "wood-capture.firebaseapp.com",
  projectId: "wood-capture",
  storageBucket: "wood-capture.appspot.com",
  messagingSenderId: "338981321175",
  appId: "1:338981321175:web:806c30bfcf31e19c237392",
  measurementId: "G-0Q15X74W4G"
};

firebase.initializeApp(firebaseConfig);

export default firebase;