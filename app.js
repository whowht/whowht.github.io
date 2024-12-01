// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQvQeyl5Y6tOoU_vyP4SDnr-jx4_e4hmo",
  authDomain: "mywebapp-af5f2.firebaseapp.com",
  projectId: "mywebapp-af5f2",
  storageBucket: "mywebapp-af5f2.firebasestorage.app",
  messagingSenderId: "534289751170",
  appId: "1:534289751170:web:dc2a4acb125a067c86a89b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const dataInput = document.getElementById("data");
const outputDiv = document.getElementById("output");

// Authentication Handlers
document.getElementById("signup").addEventListener("click", async () => {
  try {
    await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    alert("Sign Up Successful!");
  } catch (error) {
    alert(error.message);
  }
});

document.getElementById("login").addEventListener("click", async () => {
  try {
    await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    alert("Login Successful!");
  } catch (error) {
    alert(error.message);
  }
});

document.getElementById("logout").addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("Logged Out!");
  } catch (error) {
    alert(error.message);
  }
});

// Firestore Handlers
document.getElementById("save").addEventListener("click", async () => {
  try {
    await addDoc(collection(db, "notes"), { text: dataInput.value });
    alert("Data Saved!");
    loadContent();
  } catch (error) {
    alert(error.message);
  }
});

async function loadContent() {
  outputDiv.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "notes"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    outputDiv.innerHTML += `<p>${data.text}</p>`;
  });
}

// Load initial content
loadContent();
