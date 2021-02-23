import { firebaseApp } from "./firebase";
import firebase from "firebase";
require('firebase/firestore')

const db= firebase.firestore(firebaseApp)

export const getCollection = async(collection) =>{
    const result = {
        statusResponse: false,
        data: null,
        error: null
    }

    try {
        const data = await db.collection(collection).get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data()}))
        result.statusResponse = true
        result.data = arrayData
    } catch (error) {
        result.error = error
    }

    return result
}

export const  deleteDocument = async(collection,id) => {
    const result ={
        statusResponse : false,
        error : null
    }

    try {
        await db.collection(collection).doc(id).delete()
        result.statusResponse=true
    } catch (error) {
        result.error = error
    }

    return result
}