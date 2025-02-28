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

export const getProductsFromCart = async (userId) => {
    alert(userId)
    const q = query(collection(db, "cart_item"), where("id_user", "==", userId));
    const cartSnapshot = await getDocs(q);

    console.log(cartSnapshot)
    const productIds = cartSnapshot.docs.map(doc => doc.data().id_product);

    if (productIds.length === 0) {
        return [];
    }
    console.log(productIds)

    const productQuery = query(collection(db, "productos"), where(documentId(), "in", productIds));
    const productSnapshot = await getDocs(productQuery);
    console.log("asdasdasd")
    console.log(productSnapshot)
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