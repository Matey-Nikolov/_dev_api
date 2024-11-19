import { auth, signInWithEmailAndPassword } from './firebase-config.js';
import { db, doc, collection, getDocs, addDoc } from './firebase-config.js';

let accessToken;

const loginToApp = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
        accessToken = userCredential.user.accessToken;
    })
    .catch((error) => {
        accessToken = false;
    });

    return accessToken;
};

const findUserInDatabase = async (userEmail) => {
    const data = await getDocs(collection(db, process.env.FIREBASE_COLLECTION));

    let returnData = {};

    data.docs.map((doc) => {
        if(doc.data().email === userEmail){
            returnData = {
                clientId: doc.data().client_id,
                client_secret_Id: doc.data().client_secret
            };
        };
    });

    return returnData;
};

export { loginToApp, findUserInDatabase };