import FormField from '#/components/FormField'
import { ImagePlus, Pencil, X } from 'lucide-react'
import type { ReactNode } from 'react'

export function ProductDetails() {
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
          <ImagePlaceholder />
          <ImagePlaceholder />
        </div>
      </div>
      <p className="text-xs font-semibold tracking-widest text-[#a87968]">
        HOZ-CRE-006
      </p>
      <h2 className="mt-1 text-xl font-semibold text-[#302724]">
        Crème hydratante au karité
      </h2>
      <p className="mt-1 text-sm text-[#8d817a]">Soins du visage</p>
      <p className="mt-5 text-sm leading-6 text-[#625650]">
        Une crème nourrissante pour une peau douce et hydratée.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <DetailMetric label="Prix de vente" value="12 500 FCFA" />
        <DetailMetric label="Prix promotionnel" value="Aucune promotion" />
        <DetailMetric label="Stock actuel" value="14 unités" />
        <DetailMetric label="Unités vendues" value="32" />
      </div>
      <div className="mt-6 flex justify-end gap-3 border-t border-[#f3efeb] pt-5">
        <button
          type="button"
          className="rounded-xl border border-[#eee8e2] px-4 py-2.5 text-sm text-[#625650]"
        >
          Fermer
        </button>
        <button
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

export function ProductEditor() {
  return (
    <Modal title="Modifier le produit">
      <form className="space-y-4">
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
            <span className="text-xs text-[#8d817a]">2/4</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <ImagePlaceholder />
            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#ddcec3] bg-[#faf8f6]">
              <ImagePlus className="text-[#a87968]" size={20} />
              <span className="mt-2 text-xs text-[#625650]">Ajouter</span>
              <input type="file" accept="image/*" multiple className="sr-only" />
            </label>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Nom du produit">
            <input defaultValue="Crème hydratante au karité" className={inputClass} />
          </FormField>
          <FormField label="Référence SKU">
            <input defaultValue="HOZ-CRE-006" className={inputClass} />
          </FormField>
          <FormField label="Catégorie">
            <select className={inputClass}>
              <option>Soins du visage</option>
              <option>Soins du corps</option>
            </select>
          </FormField>
          <FormField label="Prix (FCFA)">
            <input type="number" defaultValue="12500" className={inputClass} />
          </FormField>
          <FormField label="Prix promotionnel">
            <input type="number" placeholder="Facultatif" className={inputClass} />
          </FormField>
          <FormField label="Seuil d’alerte stock bas">
            <input type="number" defaultValue="5" className={inputClass} />
          </FormField>
          <FormField label="Description">
            <textarea rows={3} className={inputClass} />
          </FormField>
          <FormField label="Ingrédients">
            <textarea rows={3} className={inputClass} />
          </FormField>
        </div>
        <div className="flex justify-end gap-3 border-t border-[#f3efeb] pt-5">
          <button
            type="button"
            className="rounded-xl border border-[#eee8e2] px-4 py-2.5 text-sm text-[#625650]"
          >
            Annuler
          </button>
          <button
            type="button"
            className="rounded-xl bg-[#302724] px-4 py-2.5 text-sm font-medium text-white"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </Modal>
  )
}

function Modal({ title, children }: { title: string; children: ReactNode }) {
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
