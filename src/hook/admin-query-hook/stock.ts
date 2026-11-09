import type { stockMouvementType } from '#/schema'
import {
  allStockFn,
  createStockFn,
  deleteStockFn,
  updateStockFn,
} from '#/servers/admin/stock-server'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const stockKey = ['stock-list'] as const

export const useAddStock = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: stockMouvementType) =>
      await createStockFn({ data: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stockKey })
    },
  })
}

export const useAllStock = () => {
  return useQuery({
    queryFn: allStockFn,
    queryKey: stockKey,
    refetchOnWindowFocus: false,
  })
}

export const useUpdateStock = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Partial<stockMouvementType>) =>
      await updateStockFn({ data: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stockKey })
    },
  })
}

export const useDeleteStock = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: string) => await deleteStockFn({ data: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stockKey })
    },
  })
}
