import { collection, addDoc } from "firebase/firestore";
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

// export default createProduct
