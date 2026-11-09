import { db } from '#/config/firebase'
import { ErrorServer } from '#/middlewares/validator'
import type { categoryType } from '#/schema'
import type { DocumentData, DocumentReference } from 'firebase/firestore'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'

const collections = 'AdminCategory' as const

const createCategorie = async (
  data: categoryType,
): Promise<DocumentReference<DocumentData, DocumentData>> => {
  if (!data.author) {
    throw new ErrorServer('Id manquant', 400)
  }

  return await addDoc(collection(db, collections), data)
}

const allCategorie = async (): Promise<categoryType[]> => {
  const querySnapshot = await getDocs(collection(db, collections))
  const table: categoryType[] = []
  querySnapshot.forEach((docs) => {
    const data = docs.data()
    table.push({
      id: docs.id,
      ...data,
      created_at:
        data.created_at instanceof Timestamp
          ? data.created_at.toDate()
          : data.created_at,
      updated_at:
        data.update_at instanceof Timestamp
          ? data.update_at.toDate()
          : data.update_at,
    } as categoryType)
  })

  return table
}

const updateCategorie = async (data: Partial<categoryType>) => {
  if (!data.id) {
    throw new ErrorServer('Identifiant manquant', 400)
  }
  const washingtonRef = doc(db, collections, data.id)
  const playsolder: Partial<categoryType> = {
    ...data,
  }
  return await updateDoc(washingtonRef, playsolder)
}

const deleteCategorie = async (docId: string) => {
  if (!docId) {
    throw new ErrorServer('Identifiant manquant', 400)
  }
  const docRef = doc(db, collections, docId)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    throw new ErrorServer('Document inexistant', 400)
  }

  return await deleteDoc(docRef)
}
export { allCategorie, createCategorie, deleteCategorie, updateCategorie }
