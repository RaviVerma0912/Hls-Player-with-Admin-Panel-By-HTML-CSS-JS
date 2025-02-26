// ✅ Firestore Initialization
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ✅ Channel List Fetch Karna
const channelList = document.getElementById("channel-list");

db.collection("channels").onSnapshot(snapshot => {
    channelList.innerHTML = ""; // Purani list clear karo
    snapshot.forEach(doc => {
        const data = doc.data();
        const listItem = document.createElement("button");
        listItem.innerText = data.name;
        listItem.onclick = () => playVideo(data.url);
        channelList.appendChild(listItem);
    });
});

// ✅ HLS Player Function
function playVideo(url) {
    const video = document.getElementById("video");
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
    }
}
