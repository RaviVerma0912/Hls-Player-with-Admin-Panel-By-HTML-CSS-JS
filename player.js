import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

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

// Get Channel ID from URL
const urlParams = new URLSearchParams(window.location.search);
const channelId = urlParams.get("id");

async function loadChannel() {
    if (!channelId) {
        document.getElementById("channel-name").innerText = "Channel not found!";
        return;
    }

    const channelDoc = await getDoc(doc(db, "channels", channelId));
    if (!channelDoc.exists()) {
        document.getElementById("channel-name").innerText = "Channel does not exist!";
        return;
    }

    const data = channelDoc.data();
    document.getElementById("channel-name").innerText = data.name;

    const video = document.getElementById("video-player");
    const videoSrc = data.url;

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoSrc;
    } else {
        video.outerHTML = `<p>Your browser does not support HLS streaming.</p>`;
    }
}

document.addEventListener("DOMContentLoaded", loadChannel);
