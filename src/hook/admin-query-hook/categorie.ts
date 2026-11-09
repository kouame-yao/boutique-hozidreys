import type { categoryType } from '#/schema'
import {
  allCaegorieFn,
  createCategorieFn,
  deleteCategorieFn,
  updateCategorieFn,
} from '#/servers/admin/categorie-server'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const categorieKey = ['categorie-list'] as const

export const useAddCat = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: categoryType) =>
      await createCategorieFn({ data: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categorieKey })
    },
  })
}

export const useAllCat = () => {
  return useQuery({
    queryFn: allCaegorieFn,
    queryKey: categorieKey,
    refetchOnWindowFocus: false,
  })
}

export const useUpdateCat = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Partial<categoryType>) =>
      await updateCategorieFn({ data: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categorieKey })
    },
  })
}

export const useDeleteCat = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: string) => await deleteCategorieFn({ data: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categorieKey })
    },
  })
}
