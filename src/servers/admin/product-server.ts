import { validatorSchema } from '#/middlewares/validator'
import type { productType } from '#/schema'
import { productSchema } from '#/schema'
import {
  allProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from '#/services/admin/product-service'
import { Logger } from '#/utils/initialiseLogger'
import { createServerFn } from '@tanstack/react-start'

const createProductFn = createServerFn({ method: 'POST' })
  .validator((data: productType) => validatorSchema(productSchema, data))
  .handler(async ({ data }) => {
    try {
      const addDoc = await createProduct({ ...data, author: 'bien' })
      Logger.info(addDoc.id)
    } catch (error) {
      console.log(`Erreur detecter : ${error}`)
      throw error
    }
  })

const allProductFn = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const categorie = await allProduct()
    return categorie
  } catch (error) {
    console.log(error)
    throw error
  }
})

const updateProductFn = createServerFn({ method: 'POST' })
  .validator((data: Partial<productType>) =>
    validatorSchema(productSchema.partial(), data),
  )
  .handler(async ({ data }) => {
    try {
      const editDoc = await updateProduct(data)
      console.log(editDoc)
    } catch (error) {
      console.log(`Erreur detecter : ${error}`)
      throw error
    }
  })

const deleteProductFn = createServerFn({ method: 'POST' })
  .validator((data: string) => data)
  .handler(async ({ data }) => {
    try {
      const editDoc = await deleteProduct(data)
      console.log(editDoc)
    } catch (error) {
      console.log(`Erreur detecter : ${error}`)
      throw error
    }
  })

export { allProductFn, createProductFn, deleteProductFn, updateProductFn }
