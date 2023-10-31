import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { addDoc, doc, getDocs, getFirestore, collection, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import { firebaseConfig } from "./firebaseConfig.js";

import { welcomePage, render, loginInfo, afterAuthorization, loginTemplate, alertError } from "../Global/globalLit.js";
import { divApp, authenticationClass, welcomeNavigator } from '../Global/globalInport.js'

import { whoIam } from "../Js/authorization.js";
import { authorization } from "../Js/global.js";
import { getInformation_Register, validationRegisterInput } from "./validationRegister.js";

const app = initializeApp(firebaseConfig);
let docRef;
//https://firebase.google.com/docs/firestore/query-data/get-data#web-version-9_3

const db = getFirestore(app);
let idDoc = '';
let client_idDb = '';
let client_secretDb = '';
let newAccess_token = '';

async function refresh(){
    const refreshToken = new authenticationClass();
  
    refreshToken.postToken()
    .then(async (accessToken) => {
        newAccess_token = await accessToken;
        const docToUpdate = doc(db, 'User', idDoc);

        updateDoc(docToUpdate, {
            access_token: newAccess_token
        });

        authorization(undefined, undefined, newAccess_token);

        render(welcomePage(afterAuthorization('Renew token.')), divApp);
    });
};

async function createUser(event){
    event.preventDefault();

    if (validationRegisterInput()) {
        docRef = await addDoc(collection(db, 'User'), {
            username: getInformation_Register.username,
            password: getInformation_Register.password,
            role: getInformation_Register.role,
            client_id: getInformation_Register.client_Id,
            client_secret: getInformation_Register.Client_Secret,
            access_token: ''
        });

        welcomeNavigator();
    }
};

async function loginUser(usernameInput, passwordInput){
    const postAccessToken = new authenticationClass();
    const querySnapshot = await getDocs(collection(db, 'User'));

    let trueFalse = true;

    let userDb = '';
    let passwordDb = '';
    let roleDb = '';

    querySnapshot.forEach(function(docInterator) {

        userDb = docInterator.data().username;
        passwordDb = docInterator.data().password;
        roleDb = docInterator.data().role;

        if (userDb === usernameInput && passwordDb === passwordInput){
            idDoc = docInterator.id;

            client_idDb = docInterator.data().client_id;
            client_secretDb = docInterator.data().client_secret;
            
            postAccessToken.postToken()
            .then(async (accessToken) => {
                newAccess_token = await accessToken;
                const docToUpdate = doc(db, 'User', idDoc);

                await updateDoc(docToUpdate, {
                    access_token: newAccess_token
                });

                await whoIam(newAccess_token);
            });

            render(welcomePage(loginInfo(), roleDb), divApp);

            trueFalse = false;
            return;
        }
    });

    if (trueFalse) {
        render(welcomePage(loginTemplate(alertError('Your username or password is invalid!'))), divApp); 
    }
};

export { createUser, loginUser, refresh };
export { client_idDb, client_secretDb }