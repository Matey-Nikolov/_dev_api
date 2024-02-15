import { auth, signInWithEmailAndPassword, db, collection, getDocs, doc } from '../firebase/firebase-config';

import SecureStorage from 'react-secure-storage';

class AuthLogin {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.accessToken = '';
    this.usersCollectionRef = collection(db, 'User');

    this.clients = { };
  };

  async signIn() {
    await signInWithEmailAndPassword(auth, this.email, this.password)
      .then(async (userCredential) => {
        this.accessToken = userCredential.user.accessToken;
      })
      .catch((error) => {
        return this.accessToken = false;
      });

    return this.accessToken;
  };

  async findUserByEmail(userEmail) {
    const data = await getDocs(this.usersCollectionRef);
    let returnData = {};

    data.docs.map((doc) => {
      if(doc.data().email === userEmail){

        SecureStorage.setItem('ref', doc.id);
        
        returnData = {
          clientId: doc.data().client_id,
          client_secret_Id: doc.data().client_secret
        };
      }
    });

    return returnData;
  };

  async setupClients(){
    const id = SecureStorage.getItem('ref');

    const docRef = doc(db, 'User', id);
    const subCollectionRef = collection(docRef, 'accessClients');

    const querySnapshot = await getDocs(subCollectionRef);

    querySnapshot.forEach((doc) => {
      this.clients = doc.data();
    });

    return this.clients;
  };
};

export { AuthLogin };