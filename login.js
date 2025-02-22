// Import the required Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getDatabase, ref, get, query, orderByChild, equalTo, update, serverTimestamp } 
    from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

// Your web app's Firebase configuration
import firebaseConfig from "./config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();

// Handle login form submission
const loginForm = document.getElementById('login-form');
loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    
    // Get input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        // First, find the user's email by username
        const userQuery = query(
            ref(database, 'users'),
            orderByChild('name'),
            equalTo(username)
        );
        
        const snapshot = await get(userQuery);
        
        if (!snapshot.exists()) {
            throw new Error('Username not found');
        }
        
        // Get the user data (we expect only one user with this username)
        const userData = Object.values(snapshot.val())[0];
        const userEmail = userData.email;
        
        // Now sign in with the email and password
        const userCredential = await signInWithEmailAndPassword(auth, userEmail, password);
        const user = userCredential.user;
        
        // Update last login timestamp
        await update(ref(database, 'users/' + user.uid), {
            lastLogin: serverTimestamp()
        });
        
       
        window.location.href = "main.html"; // Redirect to main page
        
    } catch (error) {
        alert(error.message);
    }
});