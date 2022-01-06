import { db } from "./config";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
export const addDocument = async(collectionName, data) => {
    const collectionRef = collection(db, collectionName);
    await addDoc(collectionRef, {...data, createAt: serverTimestamp() });
};