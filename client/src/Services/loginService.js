import encryptData from './cryptoService'

import loginInApp from '../axiosrequests/apiLoginRequest/apiLogin'

class AuthLogin {

  constructor(email, password) {
    this.information = {
      email: email,
      password: password
    }
    this.accessToken = '';

    this.clients = { };
  };


  async signIn() {
 

    const encryptedPayload = encryptData(this.information); 
    const isLogin = await loginInApp(encryptedPayload); 


    console.log(isLogin);
        

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