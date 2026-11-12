import { db } from '#/config/firebase'
import { ErrorServer } from '#/middlewares/validator'
import type { categoryType, productType } from '#/schema'
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

const collectionsCategorie = 'AdminCategory' as const
const collectionsProduct = 'AdminProduct' as const

const createCategorie = async (
  data: categoryType,
): Promise<DocumentReference<DocumentData, DocumentData>> => {
  if (!data.author) {
    throw new ErrorServer('Id manquant', 400)
  }

  return await addDoc(collection(db, collectionsCategorie), data)
}

const allCategorie = async (): Promise<categoryType[]> => {
  const querySnapshot = await getDocs(collection(db, collectionsCategorie))
  const querySnapshotProduct = await getDocs(collection(db, collectionsProduct))

  const count = (categoryId: string) => {
    return querySnapshotProduct.docs.filter((Doc) => {
      const data = Doc.data() as productType

      return data.category === categoryId
    }).length
  }
  const table: categoryType[] = []
  querySnapshot.forEach((docs) => {
    const data = docs.data()
    table.push({
      id: docs.id,
      productCount: count(docs.id),
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
  const washingtonRef = doc(db, collectionsCategorie, data.id)
  const playsolder: Partial<categoryType> = {
    ...data,
  }
  return await updateDoc(washingtonRef, playsolder)
}

const deleteCategorie = async (docId: string) => {
  if (!docId) {
    throw new ErrorServer('Identifiant manquant', 400)
  }
  const querySnapshotProduct = await getDocs(collection(db, collectionsProduct))
  const productCountExist = querySnapshotProduct.docs.some((Doc) => {
    const data = Doc.data() as productType

    return data.category === docId
  })

  if (productCountExist)
    throw new ErrorServer(
      'Impossible de supprimer cette catégorie: Elle est déjà associer à une ou plusieurs produits',
      '',
      400,
    )
  const docRef = doc(db, collectionsCategorie, docId)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    throw new ErrorServer('Document inexistant', 400)
  }

  return await deleteDoc(docRef)
}
export { allCategorie, createCategorie, deleteCategorie, updateCategorie }
