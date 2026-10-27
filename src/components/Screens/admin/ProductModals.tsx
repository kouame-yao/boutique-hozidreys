import { PackagePlus, Pencil, X } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'
import type { AdminCategory, AdminProduct } from './adminData'
import { formatPrice } from './adminData'

export function ProductDetails({
  product,
  onClose,
  onEdit,
}: {
  product: AdminProduct
  onClose: () => void
  onEdit: () => void
}) {
  return (
    <Modal title="Fiche produit" onClose={onClose}>
      {product.images && product.images.length > 0 && (
        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {product.images.map((image, index) => (
            <img
              key={`${image.slice(0, 32)}-${index}`}
              src={image}
              alt={`${product.name} — photo ${index + 1}`}
              className="aspect-square w-full rounded-xl border border-[#eee8e2] object-cover"
            />
          ))}
        </div>
      )}
      <div className="flex items-start gap-4">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt=""
            className="size-16 shrink-0 rounded-2xl object-cover"
          />
        ) : (
          <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[#f7f0eb] text-2xl">
            ✨
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-widest text-[#a87968]">
            {product.sku}
          </p>
          <h2 className="mt-1 text-xl font-semibold text-[#302724]">
            {product.name}
          </h2>
          <p className="mt-1 text-sm text-[#8d817a]">{product.category}</p>
          <p className="mt-2 text-sm text-[#a87968]">
            ★ {product.rating?.toFixed(1) ?? '—'} / 5 · avis fictifs
          </p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-6 text-[#625650]">
        {product.description || 'Aucune description renseignée.'}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <DetailMetric
          label="Prix de vente"
          value={formatPrice(product.price)}
        />
        <DetailMetric
          label="Prix promotionnel"
          value={
            product.promotionalPrice
              ? formatPrice(product.promotionalPrice)
              : 'Aucune promotion'
          }
        />
        <DetailMetric label="Stock actuel" value={`${product.stock} unités`} />
        <DetailMetric
          label="Seuil d’alerte stock bas"
          value={`${product.lowStockThreshold ?? 10} unités`}
        />
        <DetailMetric label="Unités vendues" value={String(product.sold)} />
        <DetailMetric
          label="Valeur du stock"
          value={formatPrice(product.stock * product.price)}
        />
        <DetailMetric
          label="Économie par unité"
          value={
            product.promotionalPrice
              ? formatPrice(product.price - product.promotionalPrice)
              : 'Aucune promotion'
          }
        />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <DetailText
          label="Ingrédients"
          value={product.ingredients || 'Non renseignés.'}
        />
        <DetailText
          label="Conseils d’utilisation"
          value={product.usageInstructions || 'Non renseignés.'}
        />
      </div>
      {product.updatedAt && (
        <p className="mt-4 text-xs text-[#a99c94]">
          Dernière mise à jour : {product.updatedAt}
        </p>
      )}
      <div className="mt-6 flex justify-end gap-3 border-t border-[#f3efeb] pt-5">
        <button
          onClick={onClose}
          className="rounded-xl border border-[#eee8e2] px-4 py-2.5 text-sm text-[#625650]"
        >
          Fermer
        </button>
        <button
          onClick={onEdit}
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
  product,
  categories,
  onClose,
  onSave,
}: {
  product: AdminProduct
  categories: AdminCategory[]
  onClose: () => void
  onSave: (product: AdminProduct) => void
}) {
  const [form, setForm] = useState({
    name: product.name,
    sku: product.sku,
    category: product.category,
    price: String(product.price),
    promotionalPrice: product.promotionalPrice
      ? String(product.promotionalPrice)
      : '',
    lowStockThreshold: String(product.lowStockThreshold ?? 10),
    description: product.description ?? '',
    ingredients: product.ingredients ?? '',
    usageInstructions: product.usageInstructions ?? '',
  })
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const price = Number(form.price)
    const promotionalPrice = form.promotionalPrice
      ? Number(form.promotionalPrice)
      : undefined
    const lowStockThreshold = Number(form.lowStockThreshold)
    if (
      !form.name.trim() ||
      !form.sku.trim() ||
      !Number.isFinite(price) ||
      price <= 0 ||
      (promotionalPrice !== undefined &&
        (!Number.isFinite(promotionalPrice) ||
          promotionalPrice <= 0 ||
          promotionalPrice >= price)) ||
      !Number.isSafeInteger(lowStockThreshold) ||
      lowStockThreshold < 0
    ) {
      setError(
        'Vérifiez le nom, la référence, le prix et le seuil. Le prix promo doit être inférieur au prix normal.',
      )
      return
    }

    onSave({
      ...product,
      ...form,
      name: form.name.trim(),
      sku: form.sku.trim(),
      price,
      promotionalPrice,
      lowStockThreshold,
      updatedAt: new Date().toLocaleDateString('fr-FR'),
    })
  }

  return (
    <Modal title="Modifier le produit" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Nom du produit">
          <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className={inputClass}
          />
        </FormField>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Référence SKU">
            <input
              required
              value={form.sku}
              onChange={(event) =>
                setForm({ ...form, sku: event.target.value })
              }
              className={inputClass}
            />
          </FormField>
          <FormField label="Catégorie">
            <select
              value={form.category}
              onChange={(event) =>
                setForm({ ...form, category: event.target.value })
              }
              className={inputClass}
            >
              {!categories.some((item) => item.name === form.category) && (
                <option>{form.category}</option>
              )}
              {categories.map((category) => (
                <option key={category.id}>{category.name}</option>
              ))}
            </select>
          </FormField>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Prix (FCFA)">
            <input
              required
              min="1"
              type="number"
              value={form.price}
              onChange={(event) =>
                setForm({ ...form, price: event.target.value })
              }
              className={inputClass}
            />
          </FormField>
          <FormField label="Prix promotionnel (facultatif)">
            <input
              min="1"
              type="number"
              value={form.promotionalPrice}
              onChange={(event) =>
                setForm({ ...form, promotionalPrice: event.target.value })
              }
              className={inputClass}
            />
            <span className="mt-1 block text-xs font-normal text-[#8d817a]">
              Doit être inférieur au prix normal (
              {formatPrice(Number(form.price) || 0)}).
            </span>
          </FormField>
          <div className="rounded-xl bg-[#f7f0eb] px-3 py-2.5">
            <p className="text-xs text-[#8d817a]">Stock actuel</p>
            <p className="mt-1 text-sm font-semibold text-[#302724]">
              {product.stock} unités
            </p>
            <p className="mt-0.5 text-[10px] text-[#8d817a]">
              À alimenter via le réapprovisionnement
            </p>
          </div>
        </div>
        <FormField label="Seuil d’alerte stock bas">
          <input
            required
            min="0"
            step="1"
            type="number"
            value={form.lowStockThreshold}
            onChange={(event) =>
              setForm({ ...form, lowStockThreshold: event.target.value })
            }
            className={inputClass}
          />
        </FormField>
        <FormField label="Description">
          <textarea
            rows={3}
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
            className={inputClass}
          />
        </FormField>
        <FormField label="Ingrédients">
          <textarea
            rows={2}
            value={form.ingredients}
            onChange={(event) =>
              setForm({ ...form, ingredients: event.target.value })
            }
            className={inputClass}
          />
        </FormField>
        <FormField label="Conseils d’utilisation">
          <textarea
            rows={2}
            value={form.usageInstructions}
            onChange={(event) =>
              setForm({ ...form, usageInstructions: event.target.value })
            }
            className={inputClass}
          />
        </FormField>
        {error && (
          <p role="alert" className="text-sm text-[#b05d54]">
            {error}
          </p>
        )}
        <div className="flex justify-end gap-3 border-t border-[#f3efeb] pt-5">
          <button
            type="button"
            onClick={onClose}
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
    </Modal>
  )
}

export function RestockProduct({
  product,
  onClose,
  onRestock,
}: {
  product: AdminProduct
  onClose: () => void
  onRestock: (quantity: number) => void
}) {
  const [quantity, setQuantity] = useState('')
  const [error, setError] = useState('')
  const parsedQuantity = Number(quantity)
  const validQuantity =
    Number.isSafeInteger(parsedQuantity) &&
    parsedQuantity > 0 &&
    Number.isSafeInteger(product.stock + parsedQuantity)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!validQuantity) {
      setError('Saisissez un nombre entier positif à ajouter au stock.')
      return
    }
    onRestock(parsedQuantity)
  }

  return (
    <Modal title="Réapprovisionner le produit" onClose={onClose}>
      <div className="rounded-xl bg-[#faf8f6] p-4">
        <p className="text-xs font-semibold tracking-widest text-[#a87968]">
          {product.sku}
        </p>
        <p className="mt-1 font-semibold text-[#302724]">{product.name}</p>
        <p className="mt-1 text-sm text-[#8d817a]">
          Stock actuellement disponible :{' '}
          <span className="font-semibold text-[#302724]">
            {product.stock} unité(s)
          </span>
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <FormField label="Quantité à ajouter">
          <input
            autoFocus
            required
            min="1"
            step="1"
            type="number"
            inputMode="numeric"
            value={quantity}
            onChange={(event) => {
              setQuantity(event.target.value)
              setError('')
            }}
            placeholder="Ex. 10"
            className={inputClass}
          />
        </FormField>
        <div className="flex items-center justify-between rounded-xl border border-[#eee8e2] p-4">
          <span className="text-sm text-[#625650]">
            Nouveau stock après ajout
          </span>
          <span className="text-lg font-semibold text-[#302724]">
            {validQuantity
              ? `${product.stock + parsedQuantity} unités`
              : `${product.stock} unités`}
          </span>
        </div>
        {error && (
          <p role="alert" className="text-sm text-[#b05d54]">
            {error}
          </p>
        )}
        <div className="flex justify-end gap-3 border-t border-[#f3efeb] pt-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#eee8e2] px-4 py-2.5 text-sm text-[#625650]"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-[#302724] px-4 py-2.5 text-sm font-medium text-white"
          >
            <PackagePlus size={16} />
            Ajouter au stock
          </button>
        </div>
      </form>
    </Modal>
  )
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <div
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#302724]/40 p-4"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-7"
      >
        <div className="mb-5 flex items-center justify-between border-b border-[#f3efeb] pb-4">
          <h2 className="text-xl font-semibold text-[#302724]">{title}</h2>
          <button
            aria-label="Fermer"
            onClick={onClose}
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

function DetailMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[#faf8f6] p-3">
      <p className="text-xs text-[#8d817a]">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[#302724]">{value}</p>
    </div>
  )
}

function DetailText({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#eee8e2] p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#a87968]">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-[#625650]">{value}</p>
    </div>
  )
}

function FormField({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block text-sm font-medium text-[#302724]">
      <span className="mb-2 block">{label}</span>
      {children}
    </label>
  )
}

const inputClass =
  'w-full rounded-xl border border-[#eee8e2] bg-white px-3 py-2.5 text-sm font-normal text-[#302724] outline-none focus:border-[#c6a18f]'
