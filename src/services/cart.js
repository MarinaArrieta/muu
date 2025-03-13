import {
    addDoc,
    collection
} from "firebase/firestore";
import { db } from "../firebase/config";



const createItemCart = async (id_product, id_user) => {
    const doc = await addDoc(collection(db, "cart_item"), {
        id_product,
        id_user
    });
    return doc;
}

export const addToCart = async (product_id, user_id) => {
    try {
        const item_cart = await createItemCart(
            product_id,
            user_id
        )

    } catch (error) {
        toast({
            title: 'Hubo un error',
            description: 'Inténtalo de nuevo',
            position: 'top',
            status: 'error',
            duration: 3000,
            isClosable: true,
        })

    }
}