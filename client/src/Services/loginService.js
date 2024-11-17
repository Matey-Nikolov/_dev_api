// import { auth, signInWithEmailAndPassword, db, collection, getDocs } from '../firebase/firebase-config';

import encryptData from './cryptoService.js'

import SecureStorage from 'react-secure-storage';

import loginInApp from '../axiosrequests/apiLoginRequest/apiLogin'

class AuthLogin {

  constructor(email, password) {
    this.information = {
      email: email,
      password: password
    }
    this.accessToken = '';
    // this.usersCollectionRef = collection(db, 'User');
    this.clients = { };
  };


  async signIn() {
  /////////////////////            NEW                            ////////////////////////////////////////

    const encryptNewData = encryptData(this.information)

    const isLogin = await loginInApp(encryptNewData);


    console.log(isLogin);
    


    /////////////////////////////////////////////////////////////////////////////////////////////
/*
    await signInWithEmailAndPassword(auth, this.email, this.password)
      .then(async (userCredential) => {
        this.accessToken = userCredential.user.accessToken;
      })
      .catch((error) => {
        return this.accessToken = false;
      });

    return this.accessToken;

    */
  };



  // async findUserByEmail(userEmail) {
  //   const data = await getDocs(this.usersCollectionRef);
  //   let returnData = {};

  //   data.docs.map((doc) => {
  //     if(doc.data().email === userEmail){

  //       SecureStorage.setItem('ref', doc.id);
        
  //       returnData = {
  //         clientId: doc.data().client_id,
  //         client_secret_Id: doc.data().client_secret
  //       };
  //     }
  //   });

  //   return returnData;
  // };

   
};

export { AuthLogin };