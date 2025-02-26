// Import Firebase modules correctly
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBl8JDWxU94ar1uZnBdA7KnLP5Amm_bXV4",
  authDomain: "hls-player-f2cea.firebaseapp.com",
  projectId: "hls-player-f2cea",
  storageBucket: "hls-player-f2cea.firebasestorage.app",
  messagingSenderId: "278963584265",
  appId: "1:278963584265:web:05e49468947bc9251f67d8",
  measurementId: "G-PBSKD0SXBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export for use in other files
export { app, db };
