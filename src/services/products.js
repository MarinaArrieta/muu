import { collection, addDoc, getDocs, where } from "firebase/firestore";
import { db } from "../firebase/config";

export const createProduct = async (name, uid) => {
    const doc = await addDoc(collection(db, "products"), {
        name,
        uid,
        // isCompleted:false,
    });
    console.log("Hola, Document written with ID: ", doc.id);
    return doc;
}

export const getProducts = async () => {
    const data = await getDocs(collection(db, "productos"));
    let products = [];
    data.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
    });
    console.log(products);
    return products;
}


export const getUsers = async (uid) => {
    const q = query(collection(db, "productos"), where("uid", "==", uid));
    const data = await getDocs(q);
    let products = [];
    data.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
    });
    return products;
}