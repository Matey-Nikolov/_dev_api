import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { addDoc, doc, getDocs, getFirestore, collection, getDoc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import { firebaseConfig } from "./firebaseConfig.js";

import { welcomePage, render, loginInfo } from "../Global/globalLit.js";
import { divApp, welcomeNavigator } from '../Global/globalInport.js'

const app = initializeApp(firebaseConfig);
let docRef;
// let docSnap;

//https://firebase.google.com/docs/firestore/query-data/get-data#web-version-9_3
// single

const db = getFirestore(app);
let client_idDb = '';
let client_secretDb = '';

function validationInput(username, inputPassword, inputRole, inputClient_id, inputClient_secret){
    if (!username || !inputPassword || !inputRole || !inputClient_id || !inputClient_secret) {
        alert('Please fill in all fields.');
    }
    else{
        createUser(event, username, username, inputPassword, inputRole, inputClient_id, inputClient_secret);
    }
}

async function createUser(event, username, inputPassword, inputRole, inputClient_id, inputClient_secret){
    event.preventDefault();

    docRef = await addDoc(collection(db, 'User'), {
        username: username,
        password: inputPassword,
        role: inputRole,
        client_id: inputClient_id,
        client_secret: inputClient_secret
    });

    welcomeNavigator();
};

async function loginUser(usernameInput, passwordInput){
    const querySnapshot = await getDocs(collection(db, 'User'));

    querySnapshot.forEach((doc) => {

        let userDb = doc.data().username;
        let passwordDb = doc.data().password;

        let roleDb = doc.data().role;

        if (userDb === usernameInput && passwordDb === passwordInput) {
            
            client_idDb = doc.data().client_id;
            client_secretDb = doc.data().client_secret;
            render(welcomePage(loginInfo(), roleDb), divApp);
            // welcomeNavigator();
        }
    });
}

export { validationInput, createUser, loginUser, client_idDb, client_secretDb }