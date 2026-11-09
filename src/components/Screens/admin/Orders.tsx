import { CalendarDays, Eye, Search } from 'lucide-react'
import { AdminPageHeader, StatusBadge } from './AdminShared'

export default function Orders() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="VENTES & EXPÉDITION"
        title="Gestion des commandes"
        description="Consultez les commandes et suivez leur préparation."
      />
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <StatusCard label="Nouvelle" count="4" />
        <StatusCard label="En préparation" count="6" />
        <StatusCard label="En livraison" count="3" />
        <StatusCard label="Livrée" count="18" />
        <StatusCard label="Annulée" count="2" />
      </section>
      <section className="overflow-hidden rounded-2xl border border-[#eee8e2] bg-white">
        <div className="flex flex-col gap-3 border-b border-[#f3efeb] p-4 xl:flex-row xl:items-center xl:justify-between sm:p-5">
          <div className="relative w-full xl:max-w-xs">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a99c94]"
            />
            <input
              aria-label="Rechercher une commande"
              placeholder="N° commande, cliente, téléphone..."
              className="w-full rounded-xl border border-[#eee8e2] py-2.5 pl-10 pr-3 text-sm outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              aria-label="Filtrer par statut"
              className="rounded-xl border border-[#eee8e2] bg-white px-3 py-2.5 text-sm text-[#625650]"
            >
              <option>Tous les statuts</option>
              <option>Nouvelle</option>
              <option>En préparation</option>
              <option>En livraison</option>
              <option>Livrée</option>
              <option>Annulée</option>
            </select>
            <label className="flex items-center gap-2 rounded-xl border border-[#eee8e2] px-3 text-xs text-[#8d817a]">
              <CalendarDays size={15} />
              <span>Du</span>
              <input
                aria-label="Date de début"
                type="date"
                className="min-w-0 py-2 text-sm text-[#302724]"
              />
            </label>
            <label className="flex items-center gap-2 rounded-xl border border-[#eee8e2] px-3 text-xs text-[#8d817a]">
              <span>Au</span>
              <input
                aria-label="Date de fin"
                type="date"
                className="min-w-0 py-2 text-sm text-[#302724]"
              />
            </label>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-[#faf8f6] text-xs uppercase tracking-wide text-[#8d817a]">
              <tr>
                <th className="px-5 py-3 font-medium">Commande</th>
                <th className="px-5 py-3 font-medium">Cliente</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Articles</th>
                <th className="px-5 py-3 font-medium">Montant</th>
                <th className="px-5 py-3 font-medium">Statut</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f3efeb]">
              <OrderRow
                id="CMD-1024"
                customer="Aminata K."
                phone="+225 07 00 00 00 01"
                date="27 oct. 2026"
                items="3"
                amount="35 500 FCFA"
                status="Nouvelle"
              />
              <OrderRow
                id="CMD-1023"
                customer="Fatou D."
                phone="+225 07 00 00 00 02"
                date="26 oct. 2026"
                items="2"
                amount="21 000 FCFA"
                status="En préparation"
              />
              <OrderRow
                id="CMD-1022"
                customer="Mariame T."
                phone="+225 07 00 00 00 03"
                date="25 oct. 2026"
                items="4"
                amount="48 000 FCFA"
                status="Livrée"
              />
            </tbody>
          </table>
        </div>
        <p className="border-t border-[#f3efeb] px-5 py-3 text-xs text-[#8d817a]">
          3 commandes affichées · Exemple d’interface
        </p>
      </section>
      <section className="rounded-2xl border border-[#eee8e2] bg-white p-5">
        <h2 className="font-semibold text-[#302724]">Aperçu du détail</h2>
        <p className="mt-1 text-sm text-[#8d817a]">
          Exemple des informations visibles dans une fiche commande.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-[#faf8f6] p-4">
            <p className="text-xs text-[#8d817a]">Cliente</p>
            <p className="mt-1 font-medium text-[#302724]">Aminata K.</p>
            <p className="mt-1 text-sm text-[#71655e]">Adresse de livraison</p>
          </div>
          <div className="rounded-xl bg-[#faf8f6] p-4">
            <p className="text-xs text-[#8d817a]">Suivi</p>
            <div className="mt-2"><StatusBadge status="Nouvelle" /></div>
            <p className="mt-2 text-sm text-[#71655e]">Paiement : À la livraison</p>
          </div>
        </div>
      </section>
    </div>
  )
}

function StatusCard({ label, count }: { label: string; count: string }) {
  return (
    <article className="rounded-2xl border border-[#eee8e2] bg-white p-4">
      <p className="text-xs text-[#8d817a]">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-[#302724]">{count}</p>
    </article>
  )
}

function OrderRow({
  id,
  customer,
  phone,
  date,
  items,
  amount,
  status,
}: {
  id: string
  customer: string
  phone: string
  date: string
  items: string
  amount: string
  status: 'Nouvelle' | 'En préparation' | 'En livraison' | 'Livrée' | 'Annulée'
}) {
  return (
    <tr>
      <td className="px-5 py-4 font-medium text-[#302724]">{id}</td>
      <td className="px-5 py-4">
        <p className="font-medium text-[#302724]">{customer}</p>
        <p className="mt-1 text-xs text-[#8d817a]">{phone}</p>
      </td>
      <td className="px-5 py-4 text-[#625650]">{date}</td>
      <td className="px-5 py-4 text-[#625650]">{items}</td>
      <td className="px-5 py-4 font-medium text-[#302724]">{amount}</td>
      <td className="px-5 py-4"><StatusBadge status={status} /></td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <button type="button" aria-label={`Voir ${id}`} className="rounded-lg border border-[#eee8e2] p-2 text-[#71655e]">
            <Eye size={16} />
          </button>
          <select aria-label={`Statut ${id}`} className="max-w-40 rounded-lg border border-[#eee8e2] bg-white px-2 py-2 text-xs">
            <option>{status}</option>
            <option>En préparation</option>
            <option>En livraison</option>
            <option>Livrée</option>
          </select>
        </div>
      </td>
    </tr>
  )
}
