import { ArrowLeft, ImagePlus, X } from 'lucide-react'
import { AdminPageHeader } from './AdminShared'

export default function NewProduct() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="CATALOGUE"
        title="Ajouter un produit"
        description="Complétez les informations pour enrichir votre boutique."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-[#e7ddd5] bg-white px-4 py-3 text-sm font-medium text-[#625650]"
          >
            <ArrowLeft size={17} />
            Retour aux produits
          </button>
        }
      />
      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <section className="space-y-5 rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-7">
          <Field label="Nom du produit">
            <input
              placeholder="Ex. Crème hydratante au karité"
              className={inputClass}
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Référence (SKU)">
              <input placeholder="HOZ-CRE-006" className={inputClass} />
            </Field>
            <Field label="Catégorie">
              <select className={inputClass} defaultValue="">
                <option value="">Sélectionnez une catégorie</option>
                <option>Soins du visage</option>
                <option>Soins du corps</option>
                <option>Cheveux</option>
              </select>
            </Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Prix (FCFA)">
              <input min="1" type="number" placeholder="12500" className={inputClass} />
            </Field>
            <Field label="Prix promotionnel (facultatif)">
              <input type="number" placeholder="Ex. 10 000" className={inputClass} />
              <p className="mt-1.5 text-xs text-[#8d817a]">
                Doit être inférieur au prix normal.
              </p>
            </Field>
            <Field label="Seuil d’alerte stock bas">
              <input min="0" type="number" defaultValue="5" className={inputClass} />
            </Field>
          </div>
          <Field label="Description">
            <textarea
              rows={5}
              placeholder="Présentez les bienfaits et les caractéristiques du produit..."
              className={inputClass}
            />
          </Field>
          <Field label="Ingrédients">
            <textarea
              rows={3}
              placeholder="Ex. Beurre de karité, aloe vera, vitamine E..."
              className={inputClass}
            />
          </Field>
          <div className="flex flex-wrap justify-end gap-3 border-t border-[#f3efeb] pt-5">
            <button
              type="button"
              className="rounded-xl border border-[#e7ddd5] px-5 py-3 text-sm font-medium text-[#625650]"
            >
              Annuler
            </button>
            <button
              type="button"
              className="rounded-xl bg-[#302724] px-5 py-3 text-sm font-medium text-white"
            >
              Enregistrer le produit
            </button>
          </div>
        </section>
        <aside className="space-y-4 rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-6">
          <div>
            <h2 className="font-semibold text-[#302724]">Photos du produit</h2>
            <p className="mt-1 text-sm text-[#8d817a]">
              Ajoutez jusqu’à 4 photos · 1/4
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-[#eee8e2] bg-[#f7f0eb]">
              <ImagePlus className="text-[#a87968]" size={28} />
              <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-medium text-[#625650]">
                Photo principale
              </span>
              <button
                type="button"
                aria-label="Supprimer la photo"
                className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-[#71655e]"
              >
                <X size={15} />
              </button>
            </div>
            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#ddcec3] bg-[#faf8f6] px-3 text-center">
              <span className="mb-2 flex size-10 items-center justify-center rounded-full bg-white text-[#a87968] shadow-sm">
                <ImagePlus size={20} />
              </span>
              <span className="text-xs font-medium text-[#625650]">
                Ajouter une photo
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
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

function Field({
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
  'w-full rounded-xl border border-[#eee8e2] bg-white px-4 py-3 text-sm font-normal outline-none focus:border-[#c6a18f]'
