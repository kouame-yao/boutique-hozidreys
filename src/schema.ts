import z from 'zod'

export const categorySchema = z.object({
  id: z.string().optional(),
  author: z.string().optional(),
  name: z.string().min(3).max(255),
  productCount: z.number().min(0),
  description: z.string().optional(),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().optional(),
})

export type categoryType = z.infer<typeof categorySchema>

export const productSchema = z.object({
  id: z.string().optional(),
  author: z.string().optional(),
  name: z.string(),
  sku: z.string(),
  category: z.string(),
  price: z.number(),
  promotionalPrice: z.number().optional().default(0),
  stock: z.number().optional(),
  lowStockThreshold: z.number().optional(),
  sold: z.number(),
  description: z.string().optional(),
  rating: z.number().optional(),
  ingredients: z.string().optional(),
  usageInstructions: z.string().optional(),
  created_at: z
    .date()
    .optional()
    .default(() => new Date()),
  updated_at: z.date().optional(),
  images: z.array(z.string()).optional(),
})

export type productType = z.infer<typeof productSchema>

export const stockMouvementSchema = z
  .object({
    id: z.string().optional(),
    author: z.string().optional(),
    productId: z.string(),
    productName: z.string(),
    sku: z.string().optional(),
    type: z.enum(['Ajout', 'Retrait']),
    quantity: z.number().default(0),
    description: z.string().optional(),
    created_at: z.date().default(() => new Date()),
    updated_at: z.date().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === 'Retrait' && data.description === '') {
      ctx.addIssue({
        code: 'custom',
        path: ['description'],
        message: 'La justification est obligatoire pour le retrait',
      })
    }
  })

export type stockMouvementType = z.infer<typeof stockMouvementSchema>
