import { auth, signInWithEmailAndPassword } from './firebase-config.js';
import { db, collection, getDocs } from './firebase-config.js';

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

const findUserInDatabase_ID = async (userEmail) => {
    const data = await getDocs(collection(db, process.env.FIREBASE_COLLECTION));

    for (const doc of data.docs) {
        if (doc.data().email === userEmail) {
            return doc.id;
        };
    };
};

export { loginToApp, findUserInDatabase_ID };