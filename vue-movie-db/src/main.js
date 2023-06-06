import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByyQsbRH93XZCBNNOIrhJSA9y03ZD3SQY",
  authDomain: "vue-movies-327ed.firebaseapp.com",
  projectId: "vue-movies-327ed",
  storageBucket: "vue-movies-327ed.appspot.com",
  messagingSenderId: "82601817421",
  appId: "1:82601817421:web:6a1bc15ae0b0dcbdc8b304"
};

 const app=initializeApp(firebaseConfig);
 const firestore = getFirestore(app);
createApp(App).use(router).provide('firestore', firestore).mount('#app')
