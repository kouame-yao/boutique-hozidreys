import { validatorSchema } from '#/middlewares/validator'
import type { stockMouvementType } from '#/schema'
import { stockMouvementSchema } from '#/schema'
import {
  allStock,
  createStock,
  deleteStock,
  updateStock,
} from '#/services/admin/stock-service'
import { Logger } from '#/utils/initialiseLogger'
import { createServerFn } from '@tanstack/react-start'

const createStockFn = createServerFn({ method: 'POST' })
  .validator((data: stockMouvementType) =>
    validatorSchema(stockMouvementSchema, data),
  )
  .handler(async ({ data }) => {
    try {
      const addDoc = await createStock({ author: 'bien', ...data })
      Logger.info(addDoc.id)
    } catch (error) {
      console.log(`Erreur detecter : ${error}`)
      throw error
    }
  })

const allStockFn = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const categorie = await allStock()
    return categorie
  } catch (error) {
    console.log(error)
    throw error
  }
})

const updateStockFn = createServerFn({ method: 'POST' })
  .validator((data: Partial<stockMouvementType>) =>
    validatorSchema(stockMouvementSchema.partial(), data),
  )
  .handler(async ({ data }) => {
    try {
      const editDoc = await updateStock(data)
      console.log(editDoc)
    } catch (error) {
      console.log(`Erreur detecter : ${error}`)
      throw error
    }
  })

const deleteStockFn = createServerFn({ method: 'POST' })
  .validator((data: string) => data)
  .handler(async ({ data }) => {
    try {
      const editDoc = await deleteStock(data)
      console.log(editDoc)
    } catch (error) {
      console.log(`Erreur detecter : ${error}`)
      throw error
    }
  })

export { allStockFn, createStockFn, deleteStockFn, updateStockFn }
