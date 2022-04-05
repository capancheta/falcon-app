import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import {
    getFirestore,
    onSnapshot,
    getDoc,
    updateDoc,
    doc,
} from 'firebase/firestore';

const collectionName = process.env.REACT_APP_COLLECTION_NAME;

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
};

const app = initializeApp(firebaseConfig);
const fs = getFirestore(app);

export const authenticateAnonymously = () => {
    return signInAnonymously(getAuth(app));
};

export const getDocument = (id) => {
    return doc(fs, collectionName, id);
};

export const streamDocumentValue = (id, snapshot, error) => {
    return onSnapshot(getDocument(id), snapshot, error);
};

export const updateDocumentValue = (id, key, value) => {
    const document = getDocument(id);
    getDoc(document).then((_) => {
        const updatedValue = {};
        updatedValue[key] = value;
        updateDoc(document, updatedValue);
    });
};
