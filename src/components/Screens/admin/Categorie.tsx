import DeleteDialog from '#/components/DeleteDialog'
import FormField from '#/components/FormField'
import Loader from '#/components/Loader'
import {
  useAddCat,
  useAllCat,
  useDeleteCat,
  useUpdateCat,
} from '#/hook/admin-query-hook/categorie'
import { categoryFormSchema, categorySchema, type categoryType } from '#/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Eye,
  Pencil,
  Plus,
  PlusCircle,
  Tag,
  Trash2,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'
import { AdminPageHeader } from './AdminShared'
export default function Categorie() {
  const [showModale, setShowMoadale] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [category, setCategory] = useState<categoryType | null>(null)

  const addCategorieMutation = useAddCat()
  const updateCategorieMutation = useUpdateCat()
  const deleteCategorieMutation = useDeleteCat()
  const allCategorieQuery = useAllCat()
  const dataCategorieQuery = allCategorieQuery.data ?? []

  const addCategorieForm = useForm<
    z.input<typeof categoryFormSchema>,
    unknown,
    categoryType
  >({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      productCount: 0,
      type: [{ value: '' }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    name: 'type',
    control: addCategorieForm.control,
  })
  const errors = addCategorieForm.formState.errors

  const onsubmitUpdateCat = (data: Partial<categoryType>) => {
    updateCategorieMutation.mutate(
      { id: data.id, ...data },
      {
        onSuccess: () => {
          toast.success('Catégorie modifier avec succès')
          setShowMoadale(false)
          setCategory(null)
        },
        onError: (error) => {
          console.log(error)
          toast.error('Une erreur est survenu')
        },
      },
    )
  }
  const onsubmitAddCat = (data: categoryType) => {
    addCategorieMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Categorie ajouter avec succès')
        addCategorieForm.reset({
          productCount: 0,
          type: [{ value: '' }],
        })
      },
      onError: (error) => {
        console.log(error)
        toast.error('Une erreur est survenue')
      },
    })
  }

  const onsubmitDeleteCat = (id: string) => {
    deleteCategorieMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Categorie supprimer avec succès')
      },
      onError: (error) => {
        toast.error(`Une erreur est survenue`, { description: error.message })
      },
    })
  }
  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="ORGANISATION"
        title="Catégories"
        description="Organisez votre catalogue pour aider vos clientes à trouver leurs essentiels."
      />
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section className="rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#302724]">
                Toutes les catégories
              </h2>
              <p className="mt-1 text-sm text-[#8d817a]">
                {dataCategorieQuery.length &&
                  `${dataCategorieQuery.length} catégories dans votre catalogue`}
              </p>
            </div>
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#f7f0eb] text-[#a87968]">
              <Tag size={19} />
            </span>
          </div>
          <div className="divide-y divide-[#f3efeb]">
            {!allCategorieQuery.isFetched
              ? 'chargement des données'
              : dataCategorieQuery.map((cat) => (
                  <CategoryRow
                    open={setShowMoadale}
                    openDetails={setShowDetails}
                    key={cat.id}
                    category={cat}
                    setCategory={setCategory}
                    onDeleteCat={onsubmitDeleteCat}
                    isloading={deleteCategorieMutation.isPending}
                  />
                ))}
          </div>
        </section>
        <section className="h-fit rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-[#302724]">
            Nouvelle catégorie
          </h2>
          <p className="mt-1 text-sm text-[#8d817a]">
            Créez un nouveau rayon beauté.
          </p>
          <form
            className="mt-5 space-y-4"
            onSubmit={addCategorieForm.handleSubmit(onsubmitAddCat)}
          >
            <FormField label="Nom" error={errors.name?.message}>
              <input
                {...addCategorieForm.register('name')}
                placeholder="Ex. Parfums"
                className="w-full rounded-xl border border-[#eee8e2] px-4 py-3 text-sm outline-none focus:border-[#c6a18f]"
              />
            </FormField>
            <FormField
              label="Type"
              error={errors.type?.root?.message ?? errors.type?.message}
            >
              <div className="flex items-center gap-2">
                <div className="flex flex-wrap gap-2">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex rounded-xl border border-[#eee8e2] px-4 py-3 text-sm outline-none focus-within:border-[#c6a18f]"
                    >
                      <input
                        {...addCategorieForm.register(`type.${index}.value`)}
                        placeholder="Ex. Parfums"
                        className="outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (fields.length === 1)
                            return addCategorieForm.setError('type', {
                              message: 'Ajouter au moins un type',
                            })
                          remove(index)
                        }}
                        aria-label="Supprimer ce type"
                        className="rounded-full text-[#8d817a] hover:text-[#b05d54] active:scale-95"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    addCategorieForm.clearErrors('type')
                    append({ value: '' })
                  }}
                  aria-label="Ajouter un type"
                  className="btn btn-circle btn-accent "
                >
                  <PlusCircle />
                </button>
              </div>
            </FormField>
            <FormField label="Description" error={errors.description?.message}>
              <textarea
                {...addCategorieForm.register('description')}
                rows={3}
                placeholder="Décrivez cette catégorie..."
                className="w-full rounded-xl border border-[#eee8e2] px-4 py-3 text-sm outline-none focus:border-[#c6a18f]"
              />
            </FormField>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#302724] px-4 py-3 text-sm font-medium text-white"
            >
              <Loader
                isloading={addCategorieMutation.isPending}
                title={
                  <>
                    <Plus size={17} />
                    Créer la catégorie
                  </>
                }
              />
            </button>
          </form>
        </section>
        {showModale && (
          <ModaleEditCategorie
            onEditCat={onsubmitUpdateCat}
            category={category}
            close={setShowMoadale}
            isloading={updateCategorieMutation.isPending}
          />
        )}
        {showDetails && category && (
          <CategoryDetailsModal
            category={category}
            close={() => setShowDetails(false)}
          />
        )}
      </div>
    </div>
  )
}

function CategoryRow({
  category,
  open,
  openDetails,
  setCategory,
  onDeleteCat,
  isloading,
}: {
  category: categoryType | null
  open: (value: boolean) => void
  openDetails: (value: boolean) => void
  setCategory: (value: categoryType | null) => void
  onDeleteCat: (value: string) => void
  isloading: boolean
}) {
  const [isOpenDeleteAlert, setOpenDeleteAlert] = useState(false)
  const confirmDelete = () => {
    onDeleteCat(category?.id as string)
  }
  return (
    <div className="flex items-center justify-between gap-3 py-4">
      {isOpenDeleteAlert && (
        <DeleteDialog
          onConfirm={confirmDelete}
          isOpen={isOpenDeleteAlert}
          onCancel={setOpenDeleteAlert}
          loading={isloading}
        />
      )}
      <div>
        <p className="font-medium text-[#302724]">{category?.name}</p>
        <p className="mt-1 text-xs text-[#8d817a]">{category?.productCount}</p>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => {
            setCategory(category)
            openDetails(true)
          }}
          type="button"
          aria-label={`Voir les détails de ${category?.name ?? 'la catégorie'}`}
          className="rounded-lg p-2 text-[#71655e] hover:bg-[#f7f0eb]"
        >
          <Eye size={16} />
        </button>
        <button
          onClick={() => {
            setCategory(category)
            open(true)
          }}
          type="button"
          aria-label={`Modifier ${category?.name ?? 'la catégorie'}`}
          className="rounded-lg p-2 text-[#71655e] hover:bg-[#f7f0eb]"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => setOpenDeleteAlert(true)}
          type="button"
          aria-label={`Supprimer ${category?.name ?? 'la catégorie'}`}
          className="rounded-lg p-2 text-[#a99c94] hover:bg-[#fbefed] hover:text-[#b05d54]"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}

function ModaleEditCategorie({
  close,
  category,
  onEditCat,
  isloading,
}: {
  category: categoryType | null
  onEditCat: (value: Partial<categoryType>) => void
  close: (value: boolean) => void
  isloading: boolean
}) {
  const updateCategorieForm = useForm<
    z.input<typeof categoryFormSchema>,
    unknown,
    categoryType
  >({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      id: category?.id,
      name: category?.name ?? '',
      description: category?.description ?? '',
      type: category?.type?.map((value) => ({ value })) ?? [{ value: '' }],
      productCount: category?.productCount,
      created_at: category?.created_at,
      updated_at: category?.updated_at,
    },
  })
  const { fields, append, remove } = useFieldArray({
    name: 'type',
    control: updateCategorieForm.control,
  })
  const errors = updateCategorieForm.formState.errors

  const onsubmitUpdateCat = (data: categoryType) => {
    onEditCat(data)
  }
  return (
    <main
      onMouseDown={(event) => {
        event.target === event.currentTarget && !isloading && close(false)
      }}
      className="fixed inset-0 z-50 grid items-center justify-center bg-black/35 p-4"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-category-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-6"
      >
        <h2
          id="edit-category-title"
          className="font-semibold text-[#302724]"
        >
          Modifier la catégorie
        </h2>
        <p className="mt-1 text-sm text-[#8d817a]">
          Modifiez son nom, ses types et sa description.
        </p>
        <form
          className="mt-4"
          onSubmit={updateCategorieForm.handleSubmit(onsubmitUpdateCat)}
        >
          <div className="grid gap-4">
            <FormField label="Nom" error={errors.name?.message}>
              <input
                {...updateCategorieForm.register('name')}
                className="w-full rounded-xl border border-[#eee8e2] px-4 py-3 text-sm outline-none focus:border-[#c6a18f]"
              />
            </FormField>
            <FormField
              label="Types"
              error={errors.type?.root?.message ?? errors.type?.message}
            >
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center gap-2 rounded-xl border border-[#eee8e2] px-4 py-3 focus-within:border-[#c6a18f]"
                  >
                    <input
                      {...updateCategorieForm.register(
                        `type.${index}.value`,
                      )}
                      placeholder="Ex. Soins du visage"
                      className="min-w-0 flex-1 text-sm outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (fields.length === 1) {
                          updateCategorieForm.setError('type', {
                            message: 'Ajoutez au moins un type',
                          })
                          return
                        }
                        remove(index)
                      }}
                      aria-label="Supprimer ce type"
                      className="rounded-full text-[#8d817a] hover:text-[#b05d54]"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    updateCategorieForm.clearErrors('type')
                    append({ value: '' })
                  }}
                  className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-[#a87968] hover:bg-[#f7f0eb]"
                >
                  <PlusCircle size={17} />
                  Ajouter un type
                </button>
              </div>
            </FormField>
            <FormField label="Description" error={errors.description?.message}>
              <textarea
                {...updateCategorieForm.register('description')}
                rows={3}
                className="w-full rounded-xl border border-[#eee8e2] px-4 py-3 text-sm outline-none focus:border-[#c6a18f]"
              />
            </FormField>
          </div>
          <div className="mt-5 flex justify-end gap-3 border-t border-[#f3efeb] pt-4">
            <button
              disabled={isloading}
              onClick={() => close(false)}
              type="button"
              className="rounded-xl border border-[#eee8e2] px-4 py-2.5 text-sm text-[#625650]"
            >
              Annuler
            </button>
            <button
              disabled={isloading}
              type="submit"
              className="rounded-xl bg-[#302724] px-4 py-2.5 text-sm text-white disabled:opacity-60"
            >
              <Loader
                isloading={isloading}
                title="Enregistrer les modifications"
              />
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

function CategoryDetailsModal({
  category,
  close,
}: {
  category: categoryType
  close: () => void
}) {
  const formatDate = (date: Date | undefined) =>
    date instanceof Date && !Number.isNaN(date.getTime())
      ? new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(date)
      : 'Non renseignée'

  return (
    <main
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close()
      }}
      className="fixed inset-0 z-50 grid items-center justify-center bg-black/35 p-4"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="category-details-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a87968]">
              Détails de la catégorie
            </p>
            <h2
              id="category-details-title"
              className="mt-1 text-xl font-semibold text-[#302724]"
            >
              {category.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Fermer les détails"
            className="rounded-lg p-2 text-[#71655e] hover:bg-[#f7f0eb]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 grid gap-4">
          <div className="rounded-xl bg-[#faf8f6] p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-[#8d817a]">
              Types
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {category.type?.length ? (
                category.type.map((type) => (
                  <span
                    key={type}
                    className="rounded-full bg-white px-3 py-1 text-sm text-[#625650]"
                  >
                    {type}
                  </span>
                ))
              ) : (
                <span className="text-sm text-[#8d817a]">Aucun type</span>
              )}
            </div>
          </div>
          <div className="rounded-xl bg-[#faf8f6] p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-[#8d817a]">
              Description
            </p>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#625650]">
              {category.description || 'Aucune description renseignée.'}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-[#faf8f6] p-4">
              <p className="text-xs text-[#8d817a]">Produits associés</p>
              <p className="mt-1 text-lg font-semibold text-[#302724]">
                {category.productCount ?? 0}
              </p>
            </div>
            <div className="rounded-xl bg-[#faf8f6] p-4">
              <p className="text-xs text-[#8d817a]">Créée le</p>
              <p className="mt-1 text-sm font-medium text-[#302724]">
                {formatDate(category.created_at)}
              </p>
            </div>
            <div className="rounded-xl bg-[#faf8f6] p-4">
              <p className="text-xs text-[#8d817a]">Dernière modification</p>
              <p className="mt-1 text-sm font-medium text-[#302724]">
                {formatDate(category.updated_at)}
              </p>
            </div>
          </div>
          {category.id && (
            <p className="text-xs text-[#a99c94]">Identifiant : {category.id}</p>
          )}
        </div>

        <div className="mt-5 flex justify-end border-t border-[#f3efeb] pt-4">
          <button
            type="button"
            onClick={close}
            className="rounded-xl bg-[#302724] px-4 py-2.5 text-sm font-medium text-white"
          >
            Fermer
          </button>
        </div>
      </section>
    </main>
  )
}
