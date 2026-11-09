import type { productType } from '#/schema'
import {
  allProductFn,
  createProductFn,
  deleteProductFn,
  updateProductFn,
} from '#/servers/admin/product-server'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const productKey = ['product-list'] as const

export const useAddProd = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: productType) =>
      await createProductFn({ data: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKey })
    },
  })
}

export const useAllProd = () => {
  return useQuery({
    queryFn: allProductFn,
    queryKey: productKey,
    refetchOnWindowFocus: false,
  })
}

export const useUpdateProd = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Partial<productType>) =>
      await updateProductFn({ data: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKey })
    },
  })
}

export const useDeleteProd = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: string) => await deleteProductFn({ data: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKey })
    },
  })
}
