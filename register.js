// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getDatabase, ref, set, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import firebaseConfig from "./config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();
const googleProvider = new GoogleAuthProvider();


const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
   event.preventDefault()

   //inputs
   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;
   const name = document.getElementById('username').value;

   createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
       // Signed up 
       const user = userCredential.user;

       return set(ref(database, 'users/' + user.uid), {
           name: name,
           email: email,
           createdAt: serverTimestamp()
       });
   })
   .then(() => {
       
       window.location.href = "main.html";  
    })
   .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       alert(errorMessage)
   });

})
