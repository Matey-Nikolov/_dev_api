// import { db, doc, collection, addDoc } from '../firebase/firebase-config';
// import SecureStorage from 'react-secure-storage';

// /**
//  * The CreateAccount class is used for creating a new account. It provides a method to create an account with the provided name, role, client ID, and client secret.
//  */
// class CreateAccount {
//   /**
//    * Constructs a new CreateAccount instance.
//    * @param {string} name - The name of the client.
//    * @param {string} role - The role of the client.
//    * @param {string} clientId - The client ID of the client.
//    * @param {string} clientSecret - The client secret of the client.
//    */
//   constructor(name, role, clientId, clientSecret) {
//     this.name = name;
//     this.role = role;
//     this.clientId = clientId;
//     this.clientSecret = clientSecret;
//     this.id = SecureStorage.getItem('ref');
//   };

//   /**
//    * Creates a new account with the provided name, role, client ID, and client secret.
//    * @returns {Promise<void>} A promise that resolves when the account of client has been created.
//    */
//   async createAccount() {
//     const docData = {
//       name: this.name,
//       role: this.role,
//       client_id: this.clientId,
//       client_secret: this.clientSecret
//     };

//     const docRef = doc(db, 'User', this.id);
//     const subCollectionRef = collection(docRef, 'accessClients');

//     // console.log(subCollectionRef);
//     await addDoc(subCollectionRef, docData);
//   };
// };

// export { CreateAccount };
