import { AlertTriangle, Bell, Package, ShoppingBag } from 'lucide-react'
import { AdminPageHeader } from './AdminShared'

export default function Alerts() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="CENTRE DE NOTIFICATIONS"
        title="Alertes de la boutique"
        description="Les événements qui demandent votre attention sont regroupés ici."
      />
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          ['Alertes actives', '3', 'À consulter'],
          ['Stocks à vérifier', '2', 'Seuil personnalisé par produit'],
          ['Priorité urgente', '1', 'Ruptures de stock'],
        ].map(([label, value, detail]) => (
          <article
            key={label}
            className="rounded-2xl border border-[#eee8e2] bg-white p-5"
          >
            <p className="text-sm text-[#8d817a]">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-[#302724]">
              {value}
            </p>
            <p className="mt-2 text-xs text-[#a99c94]">{detail}</p>
          </article>
        ))}
      </section>
      <section className="overflow-hidden rounded-2xl border border-[#eee8e2] bg-white">
        <div className="flex items-center gap-3 border-b border-[#f3efeb] px-5 py-5">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#f7f0eb] text-[#a87968]">
            <Bell size={18} />
          </span>
          <div>
            <h2 className="font-semibold text-[#302724]">À traiter</h2>
            <p className="mt-1 text-xs text-[#8d817a]">
              Exemple de notifications de la boutique.
            </p>
          </div>
        </div>
        <div className="divide-y divide-[#f3efeb]">
          <article className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fbefed] text-[#b05d54]">
              <AlertTriangle size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-[#302724]">
                  Rupture de stock : Crème hydratante
                </h3>
                <span className="rounded-full bg-[#fbefed] px-2.5 py-1 text-[11px] font-medium text-[#ad625a]">
                  Urgent
                </span>
              </div>
              <p className="mt-1 text-sm leading-6 text-[#8d817a]">
                Le produit est indisponible. Prévoyez un réapprovisionnement.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button className="rounded-lg bg-[#302724] px-3 py-2 text-xs font-medium text-white">
                  <Package className="mr-1 inline" size={14} />
                  Voir le produit
                </button>
                <button className="rounded-lg border border-[#eee8e2] px-3 py-2 text-xs font-medium text-[#71655e]">
                  Masquer l’alerte
                </button>
              </div>
            </div>
          </article>
          <article className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#f7f0eb] text-[#a87968]">
              <ShoppingBag size={18} />
            </span>
            <div>
              <h3 className="font-semibold text-[#302724]">
                Nouvelle commande CMD-1024
              </h3>
              <p className="mt-1 text-sm leading-6 text-[#8d817a]">
                Commande de cliente à vérifier et à préparer.
              </p>
              <button className="mt-3 rounded-lg bg-[#302724] px-3 py-2 text-xs font-medium text-white">
                Gérer les commandes
              </button>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
