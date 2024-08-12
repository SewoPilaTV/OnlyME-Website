// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, set, get, update, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

// Twoja konfiguracja Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDyGXS65v74hBX1_YBuMH3cCjeE4J3q8sQ",
  authDomain: "onlyme-d66a4.firebaseapp.com",
  databaseURL: "https://onlyme-d66a4-default-rtdb.firebaseio.com/",
  projectId: "onlyme-d66a4",
  storageBucket: "onlyme-d66a4.appspot.com",
  messagingSenderId: "416972790640",
  appId: "1:416972790640:web:dd6b76d6d888a708718db5",
  measurementId: "G-CW0H7CMHXY"
};

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, get, update, remove };
