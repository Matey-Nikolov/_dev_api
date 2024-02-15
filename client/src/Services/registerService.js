import { db, doc, collection, addDoc } from '../firebase/firebase-config';

import SecureStorage from 'react-secure-storage';

class CreateAccount {
    constructor(name, role, clientId, clientSecret) {
        this.name = name;
        this.role = role;
        this.clientId = clientId;
        this.clientSecret = clientSecret;

        this.id = SecureStorage.getItem('ref');
    };

    async createAccount() {
        const docData = {
            name: this.name,
            role: this.role,
            client_id: this.clientId,
            client_secret: this.clientSecret
        };

        const docRef = doc(db, 'User', this.id);

        const subCollectionRef = collection(docRef, 'accessClients');

        console.log(subCollectionRef);
        await addDoc(subCollectionRef, docData);
    };
};

export { CreateAccount };
