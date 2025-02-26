import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBl8JDWxU94ar1uZnBdA7KnLP5Amm_bXV4",
  authDomain: "hls-player-f2cea.firebaseapp.com",
  projectId: "hls-player-f2cea",
  storageBucket: "hls-player-f2cea.firebasestorage.app",
  messagingSenderId: "278963584265",
  appId: "1:278963584265:web:05e49468947bc9251f67d8",
  measurementId: "G-PBSKD0SXBM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadChannels() {
    const channelList = document.getElementById("channel-list");
    channelList.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "channels"));
    querySnapshot.forEach((doc) => {
        const data = doc.data();

        const li = document.createElement("li");
        li.innerHTML = `<a href="player.html?id=${doc.id}">${data.name}</a>`;
        channelList.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", loadChannels);
