import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBl8JDWxU94ar1uZnBdA7KnLP5Amm_bXV4",
    authDomain: "hls-player-f2cea.firebaseapp.com",
    projectId: "hls-player-f2cea",
    storageBucket: "hls-player-f2cea.appspot.com",  // ✅ Fixed Storage URL
    messagingSenderId: "278963584265",
    appId: "1:278963584265:web:05e49468947bc9251f67d8",
    measurementId: "G-PBSKD0SXBM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadChannels() {
    const channelList = document.getElementById("channel-list");
    channelList.innerHTML = ""; // Clear previous content

    try {
        const querySnapshot = await getDocs(collection(db, "channels"));
        if (querySnapshot.empty) {
            channelList.innerHTML = "<p>No channels available.</p>";
            return;
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();

            // Ensure thumbnail exists, otherwise use a placeholder image
            const thumbnail = data.thumbnail || "default-thumbnail.jpg";

            // Create the channel card
            const card = document.createElement("div");
            card.classList.add("channel-card");
            card.innerHTML = `
                <div class="channel-thumbnail">
                    <img src="${thumbnail}" alt="${data.name}" onerror="this.src='default-thumbnail.jpg'"/>
                    <span class="play-icon">▶</span>
                </div>
                <div class="channel-info">
                    <h3>${data.name}</h3>
                    <p>Click to watch</p>
                </div>
            `;

            card.innerHTML = `
                <div class="channel-thumbnail">
                    <img src="${data.thumbnail}" alt="${data.name}" class="thumbnail-img"/>
                   
                </div>
                <div class="channel-info">
                    <h3>${data.name}</h3>
                    <p>Click to watch</p>
                </div>
            `;



            // Redirect to the player when clicking the card
            card.addEventListener("click", () => {
                window.location.href = `player.html?id=${doc.id}`;
            });

            // Append the card to the container
            channelList.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading channels:", error);
        channelList.innerHTML = "<p>Error loading channels. Please try again later.</p>";
    }
}

document.addEventListener("DOMContentLoaded", loadChannels);
