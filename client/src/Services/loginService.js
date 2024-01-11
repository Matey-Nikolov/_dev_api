import { auth, signInWithEmailAndPassword, db } from '../firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

import { setGlobalStage, useGlobalState } from '../hooks';

const usersCollectionRef = collection(db, 'User');
let accessToken = '';

const signInWithEmail =  async (email, password) =>{
  await signInWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {

    await findUserByEmail(userCredential.user.email);

    accessToken = userCredential.user.accessToken;
  })
  .catch((error) => {

  });

  return accessToken;
};

const findUserByEmail = async (userEmail) =>{
  const data = await getDocs(usersCollectionRef);

  data.docs.map((doc) => { 

    //console.log(doc.data().email === userEmail);

    if(doc.data().email === userEmail){
      
    };
  });
};

export { signInWithEmail };