import firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyAc7WVo9KdZbaNQfEV2JF4B1ywxf8nLc-M",
    authDomain: "todolistapp-698ce.firebaseapp.com",
    projectId: "todolistapp-698ce",
    storageBucket: "todolistapp-698ce.appspot.com",
    messagingSenderId: "268096020705",
    appId: "1:268096020705:web:3b1be83297a7550daf17a0"
  };
  
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();