import { useEffect, useState } from "react";
import { db } from "../firebase/config";

import {
    collection,
    query,
    where,
    orderBy,
    onSnapshot,
} from "firebase/firestore";

//event khi collection thêm xóa sửa
export const useFirestore = (collectionName, condition) => {
    const [document, setDocument] = useState([]);
    useEffect(() => {
        let collectionRef = collection(db, collectionName);
        // condition {
        //     value1:"fawfw",
        //     operator:"in", < > =
        //     value2:["fwf","fwfw"]
        // }
        if (condition) {
            const { value1, operator, value2 } = condition;

            if (!value2 || value2.lenght <= 0) return;

            collectionRef = query(
                collectionRef,
                where(value1, operator, value2),
                orderBy("createAt")
            );
        }

        const unregiter = onSnapshot(collectionRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id }));
            setDocument(data);
        });
        return unregiter;
    }, [collectionName, condition]);
    return document;
};