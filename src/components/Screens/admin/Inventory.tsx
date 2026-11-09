import { ArrowDownToLine, ArrowUpFromLine, Package, Trash2 } from 'lucide-react'
import { AdminPageHeader } from './AdminShared'

export default function Inventory() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="GESTION DES INVENTAIRES"
        title="Mouvements de stock"
        description="Consultez les mouvements et préparez les opérations de stock."
      />
      <section className="grid gap-4 sm:grid-cols-3">
        <SummaryCard label="Références produits" value="18" />
        <SummaryCard label="Unités en stock" value="246" />
        <SummaryCard label="Sous le seuil d’alerte" value="3" alert />
      </section>
      <section className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="overflow-hidden rounded-2xl border border-[#eee8e2] bg-white">
          <div className="flex flex-col gap-3 border-b border-[#f3efeb] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-[#302724]">
                Historique des mouvements
              </h2>
              <p className="mt-1 text-xs text-[#8d817a]">
                Exemple des dernières opérations enregistrées.
              </p>
            </div>
            <input
              aria-label="Rechercher un mouvement"
              placeholder="Rechercher..."
              className="w-full rounded-xl border border-[#eee8e2] px-3 py-2.5 text-sm sm:max-w-56"
            />
          </div>
          <MovementRow
            type="Ajout"
            name="Crème hydratante au karité"
            sku="HOZ-CRE-006"
            date="27 oct. 2026"
            quantity="+12 unités"
          />
          <MovementRow
            type="Retrait"
            name="Huile de coco naturelle"
            sku="HOZ-HUI-002"
            date="26 oct. 2026"
            quantity="−2 unités"
          />
        </div>
        <form className="space-y-4 rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-6">
          <div>
            <h2 className="font-semibold text-[#302724]">
              Enregistrer un mouvement
            </h2>
            <p className="mt-1 text-sm text-[#8d817a]">
              Saisissez les informations du mouvement.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-[#f7f5f2] p-1">
            <button
              type="button"
              className="rounded-lg bg-white px-3 py-2.5 text-sm font-medium text-[#302724] shadow-sm"
            >
              Ajouter
            </button>
            <button
              type="button"
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#8d817a]"
            >
              Retirer
            </button>
          </div>
          <label className="block text-sm font-medium text-[#302724]">
            <span className="mb-2 block">Produit</span>
            <select className="w-full rounded-xl border border-[#eee8e2] bg-white px-3 py-3 text-sm">
              <option>Crème hydratante au karité</option>
              <option>Huile de coco naturelle</option>
            </select>
          </label>
          <label className="block text-sm font-medium text-[#302724]">
            <span className="mb-2 block">Quantité à ajouter</span>
            <input
              min="1"
              type="number"
              placeholder="Ex. 10"
              className="w-full rounded-xl border border-[#eee8e2] px-3 py-3 text-sm"
            />
          </label>
          <label className="block text-sm font-medium text-[#302724]">
            <span className="mb-2 block">Description / justificatif</span>
            <textarea
              rows={3}
              placeholder="Ex. Réception de la commande fournisseur..."
              className="w-full resize-y rounded-xl border border-[#eee8e2] px-3 py-3 text-sm"
            />
          </label>
          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#302724] px-4 py-3 text-sm font-medium text-white"
          >
            <Package size={17} />
            Enregistrer le mouvement
          </button>
        </form>
      </section>
      <section className="rounded-2xl border border-[#eee8e2] bg-white p-5">
        <h2 className="font-semibold text-[#302724]">Aperçu de suppression</h2>
        <p className="mt-2 text-sm text-[#71655e]">
          Exemple de confirmation avant de supprimer un mouvement.
        </p>
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#eee8e2] px-4 py-2.5 text-sm text-[#ad625a]"
        >
          <Trash2 size={16} />
          Supprimer un mouvement
        </button>
      </section>
    </div>
  )
}

function SummaryCard({
  label,
  value,
  alert = false,
}: {
  label: string
  value: string
  alert?: boolean
}) {
  return (
    <article className="rounded-2xl border border-[#eee8e2] bg-white p-5">
      <p className="text-sm text-[#8d817a]">{label}</p>
      <p
        className={`mt-2 text-2xl font-semibold ${
          alert ? 'text-[#b05d54]' : 'text-[#302724]'
        }`}
      >
        {value}
      </p>
    </article>
  )
}

function MovementRow({
  type,
  name,
  sku,
  date,
  quantity,
}: {
  type: 'Ajout' | 'Retrait'
  name: string
  sku: string
  date: string
  quantity: string
}) {
  const isAddition = type === 'Ajout'
  const MovementIcon = isAddition ? ArrowDownToLine : ArrowUpFromLine
  return (
    <article className="flex items-center justify-between gap-3 border-b border-[#f3efeb] p-4 last:border-0 sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${
            isAddition
              ? 'bg-[#edf4eb] text-[#5b7655]'
              : 'bg-[#fbefed] text-[#ad625a]'
          }`}
        >
          <MovementIcon size={17} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[#302724]">{name}</p>
          <p className="mt-1 text-xs text-[#8d817a]">
            {sku} · {type} · {date}
          </p>
        </div>
      </div>
      <span className="whitespace-nowrap text-sm font-semibold text-[#5b7655]">
        {quantity}
      </span>
    </article>
  )
}
