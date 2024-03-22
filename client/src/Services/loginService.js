import { auth, signInWithEmailAndPassword, db, collection, getDocs } from '../firebase/firebase-config';
import SecureStorage from 'react-secure-storage';

/**
 * The AuthLogin class is used for user authentication. It provides methods to sign in a user and find a user by email.
 */
class AuthLogin {
  /**
   * Constructs a new AuthLogin instance.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   */
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.accessToken = '';
    this.usersCollectionRef = collection(db, 'User');
    this.clients = { };
  };

  /**
   * Signs in a user with the provided email and password.
   * @returns {Promise<string>} A promise that resolves to the access token of the signed-in user.
   */
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

  /**
   * Finds a user by email in the 'User' collection of the database.
   * @param {string} userEmail - The email of the user to find.
   * @returns {Promise<Object>} A promise that resolves to an object containing the client ID and client secret of the found user.
   */
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
};

export { AuthLogin };