import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { addDoc, doc, getDocs, getFirestore, collection, getDoc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import { firebaseConfig } from "./firebaseConfig.js";

import { buttonsTemplate, welcomePage, render } from "../GlobalImport/globalLit.js";
// import { divApp } from "../src/controller/homeController.js";
// import { html, render } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

const app = initializeApp(firebaseConfig);
let docRef;
let docSnap;

const divAppDemoNotHere = document.getElementById('app');
const navBarDemoNotHere = document.getElementById('navBar');
//https://firebase.google.com/docs/firestore/query-data/get-data#web-version-9_3
// single

const db = getFirestore(app);

async function createUser(event, usernameInput, passwordInput){
    event.preventDefault();

    docRef = await addDoc(collection(db, 'user'), {
        Username: usernameInput,
        Password: passwordInput
    });

    // console.log("Document written with ID: ", docRef.id);
}

async function loginUser(usernameInput, passwordInput){
    
    const querySnapshot = await getDocs(collection(db, "user"));

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data().Username);
        let userDb = doc.data().Username;
        let passwordDb = doc.data().Password;

        if (userDb === usernameInput && passwordDb === passwordInput) {
            // return true;
            render(buttonsTemplate(userDb), navBarDemoNotHere);
            render(welcomePage(), divAppDemoNotHere);
        }
        else{
            alert('Incorrect password or username!');
        }
    });
    
    // return false;
}

export { createUser, loginUser }