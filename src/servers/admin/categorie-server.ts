import { validatorSchema } from '#/middlewares/validator'
import type { categoryType } from '#/schema'
import { categorySchema } from '#/schema'
import {
  allCategorie,
  createCategorie,
  deleteCategorie,
  updateCategorie,
} from '#/services/admin/categorie-service'
import { createServerFn } from '@tanstack/react-start'

const createCategorieFn = createServerFn({ method: 'POST' })
  .validator((data: categoryType) => validatorSchema(categorySchema, data))
  .handler(async ({ data }) => {
    try {
      await createCategorie({ author: 'id-author', ...data })
    } catch (error) {
      console.log(`Erreur detecter : ${error}`)
      throw error
    }
  })

const allCaegorieFn = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const categorie = await allCategorie()
    return categorie
  } catch (error) {
    console.log(error)
    throw error
  }
})

const updateCategorieFn = createServerFn({ method: 'POST' })
  .validator((data: Partial<categoryType>) =>
    validatorSchema(categorySchema.partial(), data),
  )
  .handler(async ({ data }) => {
    try {
      await updateCategorie(data)
    } catch (error) {
      console.log(`Erreur detecter : ${error}`)
      throw error
    }
  })

const deleteCategorieFn = createServerFn({ method: 'POST' })
  .validator((data: string) => data)
  .handler(async ({ data }) => {
    try {
      await deleteCategorie(data)
    } catch (error) {
      console.log(`Erreur detecter : ${error}`)
      throw error
    }
  })

export {
  allCaegorieFn,
  createCategorieFn,
  deleteCategorieFn,
  updateCategorieFn,
}
