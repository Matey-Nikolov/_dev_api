import { auth, signInWithEmailAndPassword, db } from '../firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

import { setGlobalState } from '../hooks';

class AuthLogin {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.accessToken = '';
    this.usersCollectionRef = collection(db, 'User');
  };

  async signIn() {
    await signInWithEmailAndPassword(auth, this.email, this.password)
      .then(async (userCredential) => {
        this.accessToken = userCredential.user.accessToken;
      })
      .catch((error) => {
        console.error(error);
      });

    return this.accessToken;
  };

  async findUserByEmail(userEmail) {
    const data = await getDocs(this.usersCollectionRef);
    let returnData = {};

    data.docs.map((doc) => {
      if(doc.data().email === userEmail){
        setGlobalState('client_Id_Db', doc.data().client_id);
        setGlobalState('client_secret_Db', doc.data().client_secret);

        returnData = {
          clientId: doc.data().client_id,
          client_secret_Id: doc.data().client_secret
        };
      }
    });

    return returnData;
  };
};

export { AuthLogin };