import db from "../db/database-config";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  QueryDocumentSnapshot,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { COLLECTIONS } from "../constants";
import { DatabaseCollectionsType, GetDocRequestData } from "../interfaces";
import {
  SendRequestData,
  UpdateRequestData,
  DeleteRequestData,
} from "../interfaces";

export const readData = async (collectionName: COLLECTIONS) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data: DatabaseCollectionsType[] = [];
  querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
    let documentDataWithId: any = {
      id: doc.id,
      ...doc.data(),
    };
    data.push(documentDataWithId);
  });
  return data;
};

//{collectionName: COLLECTIONS, data: DatabaseCollectionsType}
export const sendData = async (requestData: SendRequestData) => {
  try {
    const docRef = await addDoc(
      collection(db, requestData.collectionName),
      requestData.data
    );
    return { id: docRef.id, ...requestData.data };
  } catch (err) {
    console.error(err);
  }
};

// Update
export const updateData = async (requestData: UpdateRequestData) => {
  try {
    const { collectionName, docId, newData } = requestData;
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, newData);
  } catch (err) {
    console.error("err: ", err);
  }
};

// Delete
export const deleteData = async (requestData: DeleteRequestData) => {
  const { collectionName, docId } = requestData;
  await deleteDoc(doc(db, collectionName, docId));
  return docId;
};

// GET DOC
export const getDocByID = async (requestData: GetDocRequestData) => {
  const { collectionName, docId } = requestData;

  // Create a query against the collection.
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("Document is not found");
  }
};
