import { Pencil, Plus, Tag, Trash2, X } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'
import type { AdminCategory, AdminProduct } from './adminData'
import { AdminPageHeader, EmptyState } from './AdminShared'

export default function Categorie({
  categories,
  products,
  onAddCategory,
  onRenameCategory,
  onDeleteCategory,
}: {
  categories: AdminCategory[]
  products: AdminProduct[]
  onAddCategory: (name: string) => void
  onRenameCategory: (id: string, name: string) => void
  onDeleteCategory: (id: string) => void
}) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(
    null,
  )
  const [editName, setEditName] = useState('')
  const [editMessage, setEditMessage] = useState('')

  function productCount(categoryName: string) {
    return products.filter((product) => product.category === categoryName)
      .length
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalizedName = name.trim()
    if (!normalizedName) {
      setMessage('Saisissez un nom de catégorie.')
      return
    }
    if (
      categories.some(
        (category) =>
          category.name.toLowerCase() === normalizedName.toLowerCase(),
      )
    ) {
      setMessage('Cette catégorie existe déjà.')
      return
    }

    onAddCategory(normalizedName)
    setName('')
    setMessage('')
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
                {categories.length} catégories dans votre catalogue
              </p>
            </div>
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#f7f0eb] text-[#a87968]">
              <Tag size={19} />
            </span>
          </div>

          {categories.length === 0 ? (
            <EmptyState>Ajoutez votre première catégorie.</EmptyState>
          ) : (
            <div className="divide-y divide-[#f3efeb]">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between gap-3 py-4 first:pt-1 last:pb-1"
                >
                  <div>
                    <p className="font-medium text-[#302724]">
                      {category.name}
                    </p>
                    <p className="mt-1 text-xs text-[#8d817a]">
                      {productCount(category.name)} produits
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      aria-label={`Modifier la catégorie ${category.name}`}
                      onClick={() => {
                        setEditingCategory(category)
                        setEditName(category.name)
                        setEditMessage('')
                      }}
                      className="rounded-lg p-2 text-[#71655e] hover:bg-[#f7f0eb] hover:text-[#a87968]"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      aria-label={`Supprimer la catégorie ${category.name}`}
                      disabled={productCount(category.name) > 0}
                      title={
                        productCount(category.name) > 0
                          ? 'Cette catégorie contient des produits'
                          : 'Supprimer cette catégorie'
                      }
                      onClick={() => onDeleteCategory(category.id)}
                      className="rounded-lg p-2 text-[#a99c94] transition hover:bg-[#fbefed] hover:text-[#b05d54] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="h-fit rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-[#302724]">
            Nouvelle catégorie
          </h2>
          <p className="mt-1 text-sm text-[#8d817a]">
            Créez un nouveau rayon beauté.
          </p>
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="category-name"
                className="mb-2 block text-sm font-medium text-[#302724]"
              >
                Nom
              </label>
              <input
                id="category-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ex. Parfums"
                className="w-full rounded-xl border border-[#eee8e2] px-4 py-3 text-sm outline-none focus:border-[#c6a18f]"
              />
            </div>
            {message && (
              <p role="alert" className="text-sm text-[#b05d54]">
                {message}
              </p>
            )}
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#302724] px-4 py-3 text-sm font-medium text-white hover:bg-[#51413a]"
            >
              <Plus size={17} />
              Créer la catégorie
            </button>
          </form>
          <p className="mt-4 text-xs leading-5 text-[#8d817a]">
            Les catégories créées sont conservées uniquement en mémoire pendant
            cette démonstration.
          </p>
        </section>
      </div>
      {editingCategory && (
        <div
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setEditingCategory(null)
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#302724]/40 p-4"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-category-title"
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2
                id="edit-category-title"
                className="text-xl font-semibold text-[#302724]"
              >
                Modifier la catégorie
              </h2>
              <button
                aria-label="Fermer"
                onClick={() => setEditingCategory(null)}
                className="rounded-xl border border-[#eee8e2] p-2 text-[#71655e]"
              >
                <X size={18} />
              </button>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                const normalizedName = editName.trim()
                if (!normalizedName) {
                  setEditMessage('Saisissez un nom de catégorie.')
                  return
                }
                if (
                  categories.some(
                    (category) =>
                      category.id !== editingCategory.id &&
                      category.name.toLowerCase() ===
                        normalizedName.toLowerCase(),
                  )
                ) {
                  setEditMessage('Cette catégorie existe déjà.')
                  return
                }
                onRenameCategory(editingCategory.id, normalizedName)
                setEditingCategory(null)
              }}
              className="space-y-4"
            >
              <label className="block text-sm font-medium text-[#302724]">
                <span className="mb-2 block">Nom</span>
                <input
                  autoFocus
                  value={editName}
                  onChange={(event) => setEditName(event.target.value)}
                  className="w-full rounded-xl border border-[#eee8e2] px-4 py-3 text-sm outline-none focus:border-[#c6a18f]"
                />
              </label>
              <p className="text-xs leading-5 text-[#8d817a]">
                Le nom sera également mis à jour sur les produits associés.
              </p>
              {editMessage && (
                <p role="alert" className="text-sm text-[#b05d54]">
                  {editMessage}
                </p>
              )}
              <div className="flex justify-end gap-3 border-t border-[#f3efeb] pt-4">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="rounded-xl border border-[#eee8e2] px-4 py-2.5 text-sm text-[#625650]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#302724] px-4 py-2.5 text-sm font-medium text-white"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  )
}
