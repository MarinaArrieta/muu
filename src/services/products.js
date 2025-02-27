import { 
    collection, 
    addDoc, 
    getDocs, 
    where,
    query,
} from "firebase/firestore";
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
    console.log(data)
    let products = [];
    data.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
    });
    console.log('Los productos son: ',products);
    return products;
}


export const getUsers = async (uid) => {
    const q = query(collection(db, "productos"), where("uid", "==", uid));
    const data = await getDocs(q);
    let products = [];
    data.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
    });
    return products;
}