// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCik_zHq9HGf8pU4O13fXnLqRg7lfArz-Q",
  authDomain: "testapp-13aec.firebaseapp.com",
  projectId: "testapp-13aec",
  storageBucket: "testapp-13aec.firebasestorage.app",
  messagingSenderId: "1001144283029",
  appId: "1:1001144283029:web:b4307ca9dff2afd868509c",
  measurementId: "G-HQ2XRNV3QM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);