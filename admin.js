import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBl8JDWxU94ar1uZnBdA7KnLP5Amm_bXV4",
    authDomain: "hls-player-f2cea.firebaseapp.com",
    projectId: "hls-player-f2cea",
    storageBucket: "hls-player-f2cea.appspot.com",
    messagingSenderId: "278963584265",
    appId: "1:278963584265:web:05e49468947bc9251f67d8",
    measurementId: "G-PBSKD0SXBM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const channelForm = document.getElementById('channel-form');
const channelList = document.getElementById('channel-list');
const logoutBtn = document.getElementById('logout');

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";  // Redirect to login if not authenticated
    }
});

logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => window.location.href = "login.html");
});

async function loadChannels() {
    channelList.innerHTML = '';
    const querySnapshot = await getDocs(collection(db, "channels"));

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        // Truncate URL function
        function truncateURL(url, maxLength = 40) {
            return url.length > maxLength ? url.substring(0, maxLength) + "..." : url;
        }

        const row = `<tr>
    <td><img src="${data.thumbnail || 'default-thumbnail.jpg'}" width="50"></td>
    <td>${data.name}</td>
    <td class="url-column">
        <a href="${data.url}" target="_blank" data-full-url="${data.url}">
            ${truncateURL(data.url, 40)}
        </a>
    </td>
    <td>
        <button class="btn btn-warning" onclick="editChannel('${doc.id}', '${data.name.replace(/'/g, "\\'")}', '${data.url.replace(/'/g, "\\'")}', '${data.thumbnail.replace(/'/g, "\\'")}')">
            <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-danger" onclick="deleteChannel('${doc.id}')">
            <i class="fas fa-trash-alt"></i>
        </button>
    </td>
</tr>`;

channelList.innerHTML += row;

    });
}
 

window.editChannel = (id, name, url, thumbnail) => {
    document.getElementById('channel-id').value = id;
    document.getElementById('channel-name').value = name;
    document.getElementById('channel-url').value = url;
    document.getElementById('thumbnail-url').value = thumbnail;
};

window.deleteChannel = async (id) => {
    await deleteDoc(doc(db, "channels", id));
    loadChannels();
};

channelForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('channel-id').value;
    const name = document.getElementById('channel-name').value;
    const url = document.getElementById('channel-url').value;
    const imageUrl = document.getElementById('thumbnail-url').value; // Get image URL instead of uploading

    if (id) {
        await updateDoc(doc(db, "channels", id), { name, url, thumbnail: imageUrl });
    } else {
        await addDoc(collection(db, "channels"), { name, url, thumbnail: imageUrl });
    }

    channelForm.reset();
    loadChannels();
});

loadChannels();
