import { auth, createUserWithEmailAndPassword, db, doc, collection, setDoc } from '../firebase/firebase-config';

class CreateAccount {
    constructor(email, password, role, clientId, clientSecret) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.clientId = clientId;
        this.clientSecret = clientSecret;

        this.usersCollectionRef = collection(db, 'User');
    };

    async createAccount() {
        const docData = {
            role: this.role,
            email: this.email,
            client_id: this.clientId,
            client_secret: this.clientSecret,
        };

        await setDoc(doc(this.usersCollectionRef), docData);

        return createUserWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
            })
            .catch((error) => {
            });
    };
};

export { CreateAccount };