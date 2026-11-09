import DeleteDialog from '#/components/DeleteDialog'
import FormField from '#/components/FormField'
import Loader from '#/components/Loader'
import {
  useAddCat,
  useAllCat,
  useDeleteCat,
  useUpdateCat,
} from '#/hook/admin-query-hook/categorie'
import { categorySchema, type categoryType } from '#/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil, Plus, Tag, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { AdminPageHeader } from './AdminShared'
export default function Categorie() {
  const [showModale, setShowMoadale] = useState(false)
  const [category, setCategory] = useState<categoryType | null>(null)

  const addCategorieMutation = useAddCat()
  const updateCategorieMutation = useUpdateCat()
  const deleteCategorieMutation = useDeleteCat()
  const allCategorieQuery = useAllCat()
  const dataCategorieQuery = allCategorieQuery.data ?? []

  const addCategorieForm = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      productCount: 0,
    },
  })

  let errors = addCategorieForm.formState.errors
  addCategorieForm.setValue('productCount', 0)

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
          name: '',
          description: '',
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
        toast.success('Categorie ajouter avec succès')
      },
      onError: (error) => {
        console.log(error)
        toast.error('Une erreur est survenue')
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
      </div>
    </div>
  )
}

function CategoryRow({
  category,
  open,
  setCategory,
  onDeleteCat,
  isloading,
}: {
  category: categoryType | null
  open: (value: boolean) => void
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
            open(true)
            setCategory(category)
          }}
          type="button"
          aria-label={`Modifier ${name}`}
          className="rounded-lg p-2 text-[#71655e] hover:bg-[#f7f0eb]"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => setOpenDeleteAlert(true)}
          type="button"
          aria-label={`Supprimer ${name}`}
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
  const updateCategorieForm = useForm({
    resolver: zodResolver(categorySchema.partial()),
  })
  let errors = updateCategorieForm.formState.errors
  updateCategorieForm.setValue('id', category?.id)

  const onsubmitUpdateCat = (data: Partial<categoryType>) => {
    onEditCat(data)
  }
  return (
    <main
      onMouseDown={(event) => {
        event.target === event.currentTarget && !isloading && close(false)
      }}
      className="fixed h-screen w-screen bg-black/35 z-50 inset-0 grid justify-center items-center "
    >
      <section className="rounded-2xl border border-[#eee8e2] bg-white p-5">
        <h2 className="font-semibold text-[#302724]">Aperçu de modification</h2>
        <p className="mt-1 text-sm text-[#8d817a]">modifier une catégorie.</p>
        <form onSubmit={updateCategorieForm.handleSubmit(onsubmitUpdateCat)}>
          <div className="mt-4 grid gap-4 ">
            <FormField label="Name" error={errors.name?.message}>
              <input
                {...updateCategorieForm.register('name')}
                defaultValue={category?.name}
                className="rounded-xl border border-[#eee8e2] px-4 py-3 text-sm w-full"
              />
            </FormField>
            <FormField label="Description" error={errors.description?.message}>
              <textarea
                {...updateCategorieForm.register('description')}
                defaultValue={category?.description}
                className="rounded-xl border border-[#eee8e2] px-4 py-3 text-sm w-full"
              />
            </FormField>
          </div>
          <div className="flex gap-4">
            <button
              disabled={isloading}
              onClick={() => close(false)}
              type="button"
              className="mt-4 rounded-xl border border-[#eee8e2] px-4 py-2.5 text-sm text-[#625650]"
            >
              Annuler
            </button>
            <button
              disabled={isloading}
              type="submit"
              className="mt-4 rounded-xl border border-[#eee8e2] px-4 py-2.5 text-sm text-[#625650]"
            >
              <Loader
                isloading={isloading}
                title={'Enregistrer les modifications'}
              />
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
