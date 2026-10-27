import { ArrowLeft, ImagePlus, X } from 'lucide-react'
import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import type { AdminCategory, AdminProduct } from './adminData'
import { AdminPageHeader } from './AdminShared'

export default function NewProduct({
  categories,
  onBack,
  onCreateProduct,
}: {
  categories: AdminCategory[]
  onBack: () => void
  onCreateProduct: (product: AdminProduct) => void
}) {
  const [name, setName] = useState('')
  const [sku, setSku] = useState('')
  const [category, setCategory] = useState(categories[0]?.name ?? 'Soins')
  const [price, setPrice] = useState('')
  const [promotionalPrice, setPromotionalPrice] = useState('')
  const [lowStockThreshold, setLowStockThreshold] = useState('5')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [isReadingImages, setIsReadingImages] = useState(false)
  const [message, setMessage] = useState('')

  async function handleImageSelection(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.currentTarget.files ?? [])
    event.currentTarget.value = ''
    const availableSlots = 4 - images.length
    if (files.length > availableSlots) {
      setMessage('Vous pouvez ajouter 4 photos maximum.')
    } else {
      setMessage('')
    }

    const acceptedFiles = files
      .filter((file) => file.type.startsWith('image/'))
      .slice(0, availableSlots)
    if (acceptedFiles.length !== Math.min(files.length, availableSlots)) {
      setMessage('Seuls les fichiers image sont acceptés.')
    }
    if (acceptedFiles.length === 0) return

    setIsReadingImages(true)
    try {
      const loadedImages = await Promise.all(
        acceptedFiles.map(
          (file) =>
            new Promise<string>((resolve, reject) => {
              const reader = new FileReader()
              reader.onload = () => {
                if (typeof reader.result === 'string') resolve(reader.result)
                else reject(new Error('Impossible de lire cette image.'))
              }
              reader.onerror = () =>
                reject(new Error(`Impossible de lire l’image ${file.name}.`))
              reader.readAsDataURL(file)
            }),
        ),
      )
      setImages((current) => [...current, ...loadedImages].slice(0, 4))
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'Une erreur est survenue pendant la lecture des photos.',
      )
    } finally {
      setIsReadingImages(false)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isReadingImages) {
      setMessage('Veuillez attendre la fin du chargement des photos.')
      return
    }
    const parsedPrice = Number(price)
    const parsedPromotionalPrice = promotionalPrice
      ? Number(promotionalPrice)
      : undefined
    const parsedThreshold = Number(lowStockThreshold)
    if (
      !Number.isFinite(parsedPrice) ||
      parsedPrice <= 0 ||
      (parsedPromotionalPrice !== undefined &&
        (!Number.isFinite(parsedPromotionalPrice) ||
          parsedPromotionalPrice <= 0 ||
          parsedPromotionalPrice >= parsedPrice)) ||
      !Number.isSafeInteger(parsedThreshold) ||
      parsedThreshold < 0
    ) {
      setMessage(
        'Le prix promotionnel doit être positif et inférieur au prix normal. Vérifiez aussi le seuil de stock.',
      )
      return
    }

    onCreateProduct({
      id: `P-${Date.now()}`,
      name: name.trim(),
      sku: sku.trim(),
      category,
      price: parsedPrice,
      promotionalPrice: parsedPromotionalPrice,
      stock: 0,
      lowStockThreshold: parsedThreshold,
      sold: 0,
      description: description.trim(),
      ingredients: ingredients.trim(),
      images,
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
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-[#e7ddd5] bg-white px-4 py-3 text-sm font-medium text-[#625650] transition hover:bg-[#faf8f6]"
          >
            <ArrowLeft size={17} />
            Retour aux produits
          </button>
        }
      />

      <form
        onSubmit={handleSubmit}
        className="grid gap-5 xl:grid-cols-[1fr_320px]"
      >
        <div className="space-y-5 rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-7">
          <div>
            <label
              htmlFor="product-name"
              className="mb-2 block text-sm font-medium text-[#302724]"
            >
              Nom du produit
            </label>
            <input
              id="product-name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ex. Crème hydratante au karité"
              className="w-full rounded-xl border border-[#eee8e2] px-4 py-3 text-sm outline-none focus:border-[#c6a18f]"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="product-sku"
                className="mb-2 block text-sm font-medium text-[#302724]"
              >
                Référence (SKU)
              </label>
              <input
                id="product-sku"
                required
                value={sku}
                onChange={(event) => setSku(event.target.value)}
                placeholder="HOZ-CRE-006"
                className="w-full rounded-xl border border-[#eee8e2] px-4 py-3 text-sm outline-none focus:border-[#c6a18f]"
              />
            </div>
            <div>
              <label
                htmlFor="product-category"
                className="mb-2 block text-sm font-medium text-[#302724]"
              >
                Catégorie
              </label>
              <select
                id="product-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-xl border border-[#eee8e2] bg-white px-4 py-3 text-sm outline-none focus:border-[#c6a18f]"
              >
                {categories.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label
                htmlFor="product-price"
                className="mb-2 block text-sm font-medium text-[#302724]"
              >
                Prix (FCFA)
              </label>
              <input
                id="product-price"
                required
                min="1"
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="12500"
                className="w-full rounded-xl border border-[#eee8e2] px-4 py-3 text-sm outline-none focus:border-[#c6a18f]"
              />
            </div>
            <div>
              <label
                htmlFor="product-promotional-price"
                className="mb-2 block text-sm font-medium text-[#302724]"
              >
                Prix promotionnel (facultatif)
              </label>
              <input
                id="product-promotional-price"
                min="1"
                type="number"
                value={promotionalPrice}
                onChange={(event) => setPromotionalPrice(event.target.value)}
                placeholder="Ex. 10 000"
                className="w-full rounded-xl border border-[#eee8e2] px-4 py-3 text-sm outline-none focus:border-[#c6a18f]"
              />
              <p className="mt-1.5 text-xs text-[#8d817a]">
                Doit être inférieur au prix normal.
              </p>
            </div>
            <div>
              <label
                htmlFor="product-low-stock-threshold"
                className="mb-2 block text-sm font-medium text-[#302724]"
              >
                Seuil d’alerte stock bas
              </label>
              <input
                id="product-low-stock-threshold"
                required
                min="0"
                type="number"
                value={lowStockThreshold}
                onChange={(event) => setLowStockThreshold(event.target.value)}
                placeholder="5"
                className="w-full rounded-xl border border-[#eee8e2] px-4 py-3 text-sm outline-none focus:border-[#c6a18f]"
              />
              <p className="mt-1.5 text-xs text-[#8d817a]">
                Une alerte sera affichée lorsque le stock atteindra ce seuil. Le
                produit sera créé avec un stock de 0.
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="product-description"
              className="mb-2 block text-sm font-medium text-[#302724]"
            >
              Description
            </label>
            <textarea
              id="product-description"
              rows={5}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Présentez les bienfaits et les caractéristiques du produit..."
              className="w-full resize-y rounded-xl border border-[#eee8e2] px-4 py-3 text-sm outline-none focus:border-[#c6a18f]"
            />
          </div>
          <div>
            <label
              htmlFor="product-ingredients"
              className="mb-2 block text-sm font-medium text-[#302724]"
            >
              Ingrédients
            </label>
            <textarea
              id="product-ingredients"
              rows={3}
              value={ingredients}
              onChange={(event) => setIngredients(event.target.value)}
              placeholder="Ex. Beurre de karité, aloe vera, vitamine E..."
              className="w-full resize-y rounded-xl border border-[#eee8e2] px-4 py-3 text-sm outline-none focus:border-[#c6a18f]"
            />
          </div>
          {message && (
            <p role="alert" className="text-sm text-[#b05d54]">
              {message}
            </p>
          )}
          <div className="flex flex-wrap justify-end gap-3 border-t border-[#f3efeb] pt-5">
            <button
              type="button"
              onClick={onBack}
              className="rounded-xl border border-[#e7ddd5] px-5 py-3 text-sm font-medium text-[#625650] hover:bg-[#faf8f6]"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#302724] px-5 py-3 text-sm font-medium text-white hover:bg-[#51413a]"
            >
              Enregistrer le produit
            </button>
          </div>
        </div>

        <aside className="space-y-4 rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-6">
          <div>
            <h2 className="font-semibold text-[#302724]">Photos du produit</h2>
            <p className="mt-1 text-sm text-[#8d817a]">
              Ajoutez jusqu’à 4 photos · {images.length}/4
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {images.map((image, index) => (
              <div
                key={`${image.slice(0, 32)}-${index}`}
                className="group relative aspect-square overflow-hidden rounded-xl border border-[#eee8e2] bg-[#faf8f6]"
              >
                <img
                  src={image}
                  alt={`Photo ${index + 1} du produit`}
                  className="size-full object-cover"
                />
                <button
                  type="button"
                  aria-label={`Supprimer la photo ${index + 1}`}
                  onClick={() =>
                    setImages((current) =>
                      current.filter((_, imageIndex) => imageIndex !== index),
                    )
                  }
                  className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-[#71655e] shadow transition hover:bg-[#fbefed] hover:text-[#b05d54]"
                >
                  <X size={15} />
                </button>
                {index === 0 && (
                  <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-medium text-[#625650]">
                    Photo principale
                  </span>
                )}
              </div>
            ))}
            {images.length < 4 && (
              <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#ddcec3] bg-[#faf8f6] px-3 text-center transition hover:bg-[#f7f0eb]">
                <span className="mb-2 flex size-10 items-center justify-center rounded-full bg-white text-[#a87968] shadow-sm">
                  <ImagePlus size={20} />
                </span>
                <span className="text-xs font-medium text-[#625650]">
                  {isReadingImages
                    ? 'Chargement des photos…'
                    : 'Ajouter une photo'}
                </span>
                <span className="mt-1 text-[10px] text-[#a99c94]">
                  {4 - images.length} emplacement(s) restant(s)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={isReadingImages}
                  onChange={handleImageSelection}
                  className="sr-only"
                  aria-label="Sélectionner des photos du produit"
                />
              </label>
            )}
          </div>
          <div className="rounded-xl bg-[#f7f0eb] p-4 text-sm leading-6 text-[#765f53]">
            Formats image acceptés. Les photos et les informations du produit
            restent uniquement dans cette démonstration frontend.
          </div>
        </aside>
      </form>
    </div>
  )
}
