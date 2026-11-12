import FormField from '#/components/FormField'
import Loader from '#/components/Loader'
import { useAllCat } from '#/hook/admin-query-hook/categorie'
import { useAddProd } from '#/hook/admin-query-hook/product'
import type { AdminPage } from '#/hook/current-page-admin'
import { productSchema, type productType } from '#/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ImagePlus, X } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'
import { AdminPageHeader } from './AdminShared'

export default function NewProduct({
  setPageLayout,
}: {
  setPageLayout: (value: AdminPage) => void
}) {
  const addProductForm = useForm<
    z.input<typeof productSchema>,
    unknown,
    productType
  >({
    resolver: zodResolver(productSchema),
    defaultValues: {
      sold: 0,
      price: 0,
      promotionalPrice: 0,
      lowStockThreshold: 5,
      images: [],
    },
  })
  const addProductMutation = useAddProd()

  const [photos, setPhotos] = useState<{ file: File; preview: string }[]>([])

  const allCategorieQuery = useAllCat()
  const dataCategorieQuery = allCategorieQuery.data ?? []

  let errors = addProductForm.formState.errors

  const onSubmitAddProduct = async (data: productType) => {
    try {
      const images = await Promise.all(
        photos.map(async ({ file }) => {
          const result = await uploadImage(file)
          return result.secure_url
        }),
      )

      await addProductMutation.mutateAsync({
        ...data,
        sold: 0,
        images,
        lowStockThreshold: Number(data.lowStockThreshold),
      })

      toast.success('Produit ajouté avec succès')
      photos.forEach(({ preview }) => URL.revokeObjectURL(preview))
      setPhotos([])
      addProductForm.reset()
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error)
      toast.error(
        "Impossible d'ajouter le produit. Vérifiez les photos et réessayez.",
      )
    }
  }

  const onsubmitPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, 4 - photos.length)
    setPhotos((prev) => [
      ...prev,
      ...files.map((file) => ({ file, preview: URL.createObjectURL(file) })),
    ])
    e.target.value = ''
  }

  const removeFile = (indexToRemove: number) => {
    setPhotos((prev) => {
      const removed = prev[indexToRemove]
      if (removed) URL.revokeObjectURL(removed.preview)
      return prev.filter((_, index) => index !== indexToRemove)
    })
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="CATALOGUE"
        title="Ajouter un produit"
        description="Complétez les informations pour enrichir votre boutique."
        action={
          <button
            onClick={() => setPageLayout('products')}
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-[#e7ddd5] bg-white px-4 py-3 text-sm font-medium text-[#625650]"
          >
            <ArrowLeft size={17} />
            Retour aux produits
          </button>
        }
      />
      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <form
          onSubmit={addProductForm.handleSubmit(onSubmitAddProduct)}
          className="space-y-5 rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-7"
        >
          <FormField label="Nom du produit" error={errors.name?.message}>
            <input
              {...addProductForm.register('name')}
              placeholder="Ex. Crème hydratante au karité"
              className={inputClass}
            />
          </FormField>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Référence (SKU)" error={errors.sku?.message}>
              <input
                {...addProductForm.register('sku')}
                placeholder="HOZ-CRE-006"
                className={inputClass}
              />
            </FormField>
            <FormField label="Catégorie" error={errors.category?.message}>
              <select
                className={inputClass}
                defaultValue=""
                {...addProductForm.register('category')}
              >
                <option value="">Sélectionnez une catégorie</option>
                {dataCategorieQuery.map((cat) => (
                  <option value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </FormField>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <FormField label="Prix (FCFA)" error={errors.price?.message}>
              <input
                {...addProductForm.register('price', { valueAsNumber: true })}
                min="1"
                type="number"
                placeholder="12500"
                className={inputClass}
              />
            </FormField>
            <FormField
              label="Prix promotionnel (facultatif)"
              error={errors.promotionalPrice?.message}
            >
              <input
                defaultValue={0}
                {...addProductForm.register('promotionalPrice', {
                  valueAsNumber: true,
                })}
                type="number"
                min={0}
                placeholder="Ex. 10 000"
                className={inputClass}
              />
              <p className="mt-1.5 text-xs text-[#8d817a]">
                Doit être inférieur au prix normal.
              </p>
            </FormField>
            <FormField
              label="Seuil d’alerte stock bas"
              error={errors.lowStockThreshold?.message}
            >
              <input
                {...addProductForm.register('lowStockThreshold', {
                  valueAsNumber: true,
                })}
                min="0"
                type="number"
                defaultValue="5"
                className={inputClass}
              />
            </FormField>
          </div>
          <FormField label="Description" error={errors.description?.message}>
            <textarea
              {...addProductForm.register('description')}
              rows={5}
              placeholder="Présentez les bienfaits et les caractéristiques du produit..."
              className={inputClass}
            />
          </FormField>
          <FormField label="Ingrédients" error={errors.ingredients?.message}>
            <textarea
              {...addProductForm.register('ingredients')}
              rows={3}
              placeholder="Ex. Beurre de karité, aloe vera, vitamine E..."
              className={inputClass}
            />
          </FormField>
          <div className="flex flex-wrap justify-end gap-3 border-t border-[#f3efeb] pt-5">
            <button
              type="button"
              className="rounded-xl border border-[#e7ddd5] px-5 py-3 text-sm font-medium text-[#625650]"
            >
              Annuler
            </button>
            <button
              disabled={addProductMutation.isPending}
              type="submit"
              className="rounded-xl bg-[#302724] px-5 py-3 text-sm font-medium text-white"
            >
              <Loader
                isloading={addProductMutation.isPending}
                title={'Enregistrer le produit'}
              />
            </button>
          </div>
        </form>

        <aside className="space-y-4 rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-6">
          <div>
            <h2 className="font-semibold text-[#302724]">Photos du produit</h2>
            <p className="mt-1 text-sm text-[#8d817a]">
              Ajoutez jusqu’à 4 photos · {photos.length}/4
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {photos.map(({ preview }, index) => (
              <div
                key={preview}
                className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-[#eee8e2] bg-[#f7f0eb]"
              >
                {/* <ImagePlus className="text-[#a87968]" size={28} /> */}

                {index === 0 && (
                  <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-medium text-[#625650]">
                    Photo principale
                  </span>
                )}

                <img
                  src={preview}
                  alt=""
                  className="w-full h-full object-cover"
                />

                <button
                  onClick={() => removeFile(index)}
                  type="button"
                  aria-label="Supprimer la photo"
                  className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-[#71655e]"
                >
                  <X size={15} />
                </button>
              </div>
            ))}

            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#ddcec3] bg-[#faf8f6] px-3 text-center">
              <span className="mb-2 flex size-10 items-center justify-center rounded-full bg-white text-[#a87968] shadow-sm">
                <ImagePlus size={20} />
              </span>
              <span className="text-xs font-medium text-[#625650]">
                Ajouter une photo
              </span>
              <input
                onChange={onsubmitPhotos}
                type="file"
                accept="image/*"
                multiple
                disabled={photos.length >= 4}
                className="sr-only"
                aria-label="Sélectionner des photos du produit"
              />
            </label>
          </div>
          <div className="rounded-xl bg-[#f7f0eb] p-4 text-sm leading-6 text-[#765f53]">
            Formats image acceptés. Les photos seront affichées ici.
          </div>
        </aside>
      </div>
    </div>
  )
}

const inputClass =
  'w-full rounded-xl border border-[#eee8e2] bg-white px-4 py-3 text-sm font-normal outline-none focus:border-[#c6a18f]'

type CloudinaryUploadResult = {
  secure_url: string
}

export const uploadImage = async (
  file: File,
): Promise<CloudinaryUploadResult> => {
  const cloudName = 'p8kuxr91'
  const uploadPreset = 'hoziupload'

  const formData = new FormData()

  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
  formData.append('folder', 'hozi/products')

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    },
  )

  if (!response.ok) {
    throw new Error("Erreur lors de l'upload de l'image")
  }

  const result: unknown = await response.json()
  if (
    typeof result !== 'object' ||
    result === null ||
    !('secure_url' in result) ||
    typeof result.secure_url !== 'string'
  ) {
    throw new Error("L'URL de l'image est absente de la réponse Cloudinary")
  }

  return { secure_url: result.secure_url }
}
