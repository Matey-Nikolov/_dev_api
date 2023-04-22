import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { addDoc, doc, getDocs, getFirestore, collection, getDoc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import { firebaseConfig } from "./firebaseConfig.js";

import { welcomePage, render, layoutSidenav } from "../Global/globalLit.js";
import { divApp, welcomeNavigator } from '../Global/globalInport.js'

// import { divApp } from "../src/controller/homeController.js";
// import { html, render } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

const app = initializeApp(firebaseConfig);
let docRef;
let docSnap;

//https://firebase.google.com/docs/firestore/query-data/get-data#web-version-9_3
// single

const db = getFirestore(app);

async function createUser(event, usernameInput, passwordInput, roleInput){
    event.preventDefault();

    docRef = await addDoc(collection(db, 'User'), {
        username: usernameInput,
        password: passwordInput,
        role: roleInput
    });

    // console.log("Document written with ID: ", docRef.id);
}

async function loginUser(usernameInput, passwordInput){
    
    const querySnapshot = await getDocs(collection(db, 'User'));


    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data().Username);
        let userDb = doc.data().username;
        let passwordDb = doc.data().password;
        let roleDb = doc.data().role;


        if (userDb === usernameInput && passwordDb === passwordInput) {
            

            // layoutSidenav(roleDb);
            render(welcomePage(undefined, roleDb), divApp);
            // welcomeNavigator();
            return true;
        }
        // else{
        //     alert('Incorrect password or username!');
        // }
    });
    
    return false;
}

export { createUser, loginUser }