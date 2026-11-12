import FormField from '#/components/FormField'
import Loader from '#/components/Loader'
import { useAllCat } from '#/hook/admin-query-hook/categorie'
import { productSchema, type productType } from '#/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImagePlus, Pencil, X } from 'lucide-react'
import React, { useEffect, useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { uploadImage } from './NewProduct'

export function ProductDetails({
  productItems,
  setIsOpenDetail,
  setIsOpentEdit,
}: {
  productItems: productType | null
  setIsOpenDetail: (value: boolean) => void
  setIsOpentEdit: (value: boolean) => void
}) {
  if (!productItems) return
  const allCategorieQuery = useAllCat()
  const dataCategorieQuery = allCategorieQuery.data ?? []
  return (
    <Modal title="Fiche produit">
      <div className="mb-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#302724]">
            Photos du produit
          </h3>
          <span className="text-xs text-[#8d817a]">2/4</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {productItems.images ? (
            productItems.images.map((img) => (
              <img
                key={img}
                src={img}
                className="flex aspect-square items-center justify-center rounded-xl border"
                alt=""
              />
            ))
          ) : (
            <ImagePlaceholder />
          )}
        </div>
      </div>
      <p className="text-xs font-semibold tracking-widest text-[#a87968]">
        {productItems?.sku}
      </p>
      <h2 className="mt-1 text-xl font-semibold text-[#302724]">
        {productItems?.name}
      </h2>
      <p className="mt-1 text-sm text-[#8d817a]">
        {
          dataCategorieQuery.find((cat) => cat.id === productItems.category)
            ?.name
        }
      </p>
      <p className="mt-5 text-sm leading-6 text-[#625650]">
        {productItems?.description}
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <DetailMetric
          label="Prix de vente"
          value={`${productItems?.price} FCFA`}
        />
        <DetailMetric
          label="Prix promotionnel"
          value={
            productItems?.promotionalPrice === 0
              ? 'Aucune promotion'
              : `${productItems?.promotionalPrice} FCFA`
          }
        />
        <DetailMetric
          label="Stock actuel"
          value={`${productItems?.stock} unités`}
        />
        <DetailMetric label="Unités vendues" value={`${productItems?.sold}`} />
      </div>
      <div className="mt-6 flex justify-end gap-3 border-t border-[#f3efeb] pt-5">
        <button
          onClick={() => setIsOpenDetail(false)}
          type="button"
          className="rounded-xl border border-[#eee8e2] px-4 py-2.5 text-sm text-[#625650]"
        >
          Fermer
        </button>
        <button
          onClick={() => {
            setIsOpenDetail(false)
            setIsOpentEdit(true)
          }}
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-[#302724] px-4 py-2.5 text-sm font-medium text-white"
        >
          <Pencil size={15} />
          Modifier le produit
        </button>
      </div>
    </Modal>
  )
}

export function ProductEditor({
  productItems,
  setIsOpentEdit,
  onUpdateProduct,
  isloading,
}: {
  productItems: productType | null
  setIsOpentEdit: (value: boolean) => void
  onUpdateProduct: (data: Partial<productType>) => void
  isloading: boolean
}) {
  if (!productItems) return

  const [photos, setPhotos] = useState<
    { file: File | null; preview: string }[]
  >(() =>
    (productItems.images ?? []).map((img) => ({
      file: null,
      preview: img,
    })),
  )
  const allCategorieQuery = useAllCat()
  const dataCategorieQuery = allCategorieQuery.data ?? []
  const arraySelect = dataCategorieQuery.map((cat) => {
    return {
      name: cat.name,
      id: cat.id,
    }
  })
  const editProductForm = useForm({
    resolver: zodResolver(productSchema.partial()),
  })
  const errors = editProductForm.formState.errors

  const onsubmitUpdate = async (data: Partial<productType>) => {
    try {
      const images = await Promise.all(
        photos.map(async ({ file, preview }) => {
          if (!file) {
            return preview
          }

          const result = await uploadImage(file)
          return result.secure_url
        }),
      )

      onUpdateProduct({ id: productItems.id, ...data, images })
      photos.forEach(({ preview, file }) => {
        if (file) {
          URL.revokeObjectURL(preview)
        }
      })
    } catch (error) {
      throw error
    }
  }

  const onsubmitPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, 4 - photos.length)
    setPhotos((prev) => [
      ...prev,
      ...files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      })),
    ])
    e.target.value = ''
  }

  const removeFile = (indexToRemove: number) => {
    setPhotos((prev) => {
      const removed = prev[indexToRemove]
      if (removed?.file) {
        URL.revokeObjectURL(removed.preview)
      }

      return prev.filter((_, index) => index !== indexToRemove)
    })
  }

  useEffect(() => {
    setPhotos(
      (productItems.images ?? []).map((img) => ({
        file: null,
        preview: img,
      })),
    )
  }, [productItems.images])

  return (
    <Modal title="Modifier le produit" closeModal={setIsOpentEdit}>
      <form
        className="space-y-4"
        onSubmit={editProductForm.handleSubmit(onsubmitUpdate)}
      >
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[#302724]">
                Photos du produit
              </h3>
              <p className="mt-1 text-xs text-[#8d817a]">
                Modifiez les photos ou ajoutez-en jusqu’à 4.
              </p>
            </div>
            <span className="text-xs text-[#8d817a]">{photos.length}/4</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3  gap-3">
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

            <label className="flex flex-1/2 aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#ddcec3] bg-[#faf8f6] px-3 text-center">
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
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Nom du produit" error={errors.name?.message}>
            <input
              {...editProductForm.register('name')}
              defaultValue={productItems.name}
              className={inputClass}
            />
          </FormField>
          <FormField label="Référence SKU" error={errors.sku?.message}>
            <input
              {...editProductForm.register('sku')}
              defaultValue={productItems.sku}
              className={inputClass}
            />
          </FormField>
          <FormField label="Catégorie" error={errors.category?.message}>
            <select
              defaultValue={productItems.category}
              {...editProductForm.register('category')}
              className={inputClass}
            >
              {arraySelect.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Prix (FCFA)" error={errors.price?.message}>
            <input
              {...editProductForm.register('price', { valueAsNumber: true })}
              type="number"
              defaultValue={productItems.price}
              className={inputClass}
            />
          </FormField>
          <FormField
            label="Prix promotionnel"
            error={errors.promotionalPrice?.message}
          >
            <input
              {...editProductForm.register('promotionalPrice', {
                valueAsNumber: true,
              })}
              defaultValue={productItems.promotionalPrice}
              type="number"
              placeholder="Facultatif"
              className={inputClass}
            />
          </FormField>
          <FormField
            label="Seuil d’alerte stock bas"
            error={errors.lowStockThreshold?.message}
          >
            <input
              type="number"
              {...editProductForm.register('lowStockThreshold', {
                valueAsNumber: true,
              })}
              defaultValue={productItems.lowStockThreshold}
              className={inputClass}
            />
          </FormField>
          <FormField label="Description" error={errors.description?.message}>
            <textarea
              {...editProductForm.register('description')}
              rows={3}
              className={inputClass}
              defaultValue={productItems.description}
            />
          </FormField>
          <FormField label="Ingrédients" error={errors.ingredients?.message}>
            <textarea
              {...editProductForm.register('ingredients')}
              rows={3}
              className={inputClass}
              defaultValue={productItems.ingredients}
            />
          </FormField>
        </div>
        <div className="flex justify-end gap-3 border-t border-[#f3efeb] pt-5">
          <button
            disabled={isloading}
            onClick={() => setIsOpentEdit(false)}
            type="button"
            className="rounded-xl border border-[#eee8e2] px-4 py-2.5 text-sm text-[#625650]"
          >
            Annuler
          </button>
          <button
            disabled={isloading}
            type="submit"
            className="rounded-xl cursor-pointer bg-[#302724] px-4 py-2.5 text-sm font-medium text-white"
          >
            <Loader isloading={isloading} title={'Enregistrer'} />
          </button>
        </div>
      </form>
    </Modal>
  )
}

function Modal({
  title,
  children,
  closeModal,
}: {
  title: string
  children: ReactNode
  closeModal?: (value: boolean) => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#302724]/40 p-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-7"
      >
        <div className="mb-5 flex items-center justify-between border-b border-[#f3efeb] pb-4">
          <h2 className="text-xl font-semibold text-[#302724]">{title}</h2>
          <button
            onClick={() => closeModal?.(false)}
            type="button"
            aria-label="Fermer"
            className="rounded-xl border border-[#eee8e2] p-2 text-[#71655e]"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </section>
    </div>
  )
}

function ImagePlaceholder() {
  return (
    <div className="flex aspect-square items-center justify-center rounded-xl border border-[#eee8e2] bg-[#f7f0eb]">
      <ImagePlus className="text-[#a87968]" size={24} />
    </div>
  )
}

function DetailMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[#faf8f6] p-3">
      <p className="text-xs text-[#8d817a]">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[#302724]">{value}</p>
    </div>
  )
}

const inputClass =
  'w-full rounded-xl border border-[#eee8e2] bg-white px-3 py-2.5 text-sm font-normal text-[#302724] outline-none focus:border-[#c6a18f]'
