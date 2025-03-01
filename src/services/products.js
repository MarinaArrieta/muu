import { 
    collection, 
    addDoc, 
    getDocs, 
    where,
    query,
    documentId,
} from "firebase/firestore";

import { db } from "../firebase/config";

export const createProduct = async (name, uid) => {
    const doc = await addDoc(collection(db, "products"), {
        name,
        uid,
    });
    return doc;
}

export const getProducts = async () => {
    const data = await getDocs(collection(db, "productos"));
    let products = [];
    data.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
    });
    return products;
}

export const getProductsFromCart = async (userId) => {
    const q = query(collection(db, "cart_item"), where("id_user", "==", userId));
    const cartSnapshot = await getDocs(q);

    const productIds = cartSnapshot.docs.map(doc => doc.data().id_product);

    if (productIds.length === 0) {
        return [];
    }

    const productQuery = query(collection(db, "productos"), where(documentId(), "in", productIds));
    const productSnapshot = await getDocs(productQuery);
    let products = [];
    productSnapshot.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
    });

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