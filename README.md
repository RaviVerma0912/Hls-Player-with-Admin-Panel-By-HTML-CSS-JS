# HLS Player with Admin Panel

## Overview
This project is a web-based **HLS (HTTP Live Streaming) Player** with an integrated **Admin Panel**. It allows users to stream HLS videos, manage video content, and control access using Firebase Firestore and Storage.

## Features
- 📺 **HLS Video Streaming**
- 🔐 **Admin Panel for Video Management**
- 🔥 **Firebase Firestore for Data Storage**
- 📂 **Firebase Storage for Video Hosting**
- 🎨 **Responsive UI with HTML, CSS, and JavaScript**
- 🚀 **Secure Access Control using Firestore Rules**

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Streaming:** HLS.js
- **Database:** Firebase Firestore
- **Storage:** Firebase Storage

## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/https://github.com/RaviVerma0912/Hls-Player-with-Admin-Panel-By-HTML-CSS-JS.git
   cd Hls-Player-with-Admin-Panel-By-HTML-CSS-JS
   ```
2. **Open `index.html` in a browser.**
3. **Configure Firebase:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project and enable Firestore & Storage
   - Add Firebase SDK to your `index.js`

## Firestore Rules (Restrict Access to Website Only)
Use these **secure Firestore rules** to allow only requests from your website:
```c
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.headers.referer.matches('^https://your-website\.com/.*$');
    }
  }
}
```

## Admin Panel Access
- Login to the admin panel to upload and manage videos.
- Make sure Firebase **Authentication** is enabled for secure access.

## Usage
1. **Upload an HLS (.m3u8) file via Admin Panel.**
2. **The player fetches and plays the uploaded video.**
3. **Secure access using Firestore rules.**

## Troubleshooting
- **Error:** *Missing or Insufficient Permissions*
  - Check Firestore rules.
  - Ensure the request is from an allowed domain.

- **HLS Video Not Playing?**
  - Verify the HLS stream URL.
  - Check browser console for errors.

## License
This project is open-source and available under the **MIT License**.

---
💡 Need help? Feel free to ask!

