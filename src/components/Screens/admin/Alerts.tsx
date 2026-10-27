import { AlertTriangle, Bell, Check, Package, ShoppingBag } from 'lucide-react'
import type { AdminPage } from '#/hook/current-page-admin'
import { AdminPageHeader, EmptyState } from './AdminShared'

export type AdminAlert = {
  id: string
  severity: 'Urgent' | 'À surveiller' | 'Information'
  title: string
  description: string
  page: AdminPage
  actionLabel: string
}

export function buildAdminAlerts(
  products: {
    id: string
    name: string
    stock: number
    lowStockThreshold?: number
  }[],
  orders: { id: string; customer: string; status: string }[],
): AdminAlert[] {
  const stockAlerts: AdminAlert[] = products
    .filter((product) => product.stock <= (product.lowStockThreshold ?? 10))
    .map((product) => ({
      id: `stock-${product.id}`,
      severity: product.stock === 0 ? 'Urgent' : 'À surveiller',
      title:
        product.stock === 0
          ? `Rupture de stock : ${product.name}`
          : `Stock faible : ${product.name}`,
      description:
        product.stock === 0
          ? `Le produit est indisponible. Le seuil d’alerte est fixé à ${product.lowStockThreshold ?? 10} unité(s). Réapprovisionnez-le pour éviter les ventes manquées.`
          : `Il reste ${product.stock} unité(s), au seuil d’alerte configuré (${product.lowStockThreshold ?? 10}). Pensez à prévoir un réapprovisionnement.`,
      page: 'products',
      actionLabel: 'Voir le produit',
    }))

  const orderAlerts: AdminAlert[] = orders
    .filter((order) => order.status === 'Nouvelle')
    .map((order) => ({
      id: `order-${order.id}`,
      severity: 'Information',
      title: `Nouvelle commande ${order.id}`,
      description: `Commande de ${order.customer} à vérifier et à préparer.`,
      page: 'orders',
      actionLabel: 'Gérer les commandes',
    }))

  return [...orderAlerts, ...stockAlerts]
}

export default function Alerts({
  alerts,
  onDismiss,
  onDismissAll,
  onNavigate,
}: {
  alerts: AdminAlert[]
  onDismiss: (id: string) => void
  onDismissAll: () => void
  onNavigate: (page: AdminPage) => void
}) {
  const urgentCount = alerts.filter(
    (alert) => alert.severity === 'Urgent',
  ).length
  const stockCount = alerts.filter((alert) =>
    alert.id.startsWith('stock-'),
  ).length

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="CENTRE DE NOTIFICATIONS"
        title="Alertes de la boutique"
        description="Les événements qui demandent votre attention sont regroupés ici."
        action={
          alerts.length > 0 ? (
            <button
              onClick={onDismissAll}
              className="inline-flex items-center gap-2 rounded-xl border border-[#eee8e2] bg-white px-4 py-3 text-sm font-medium text-[#625650] hover:bg-[#faf8f6]"
            >
              <Check size={16} />
              Tout marquer comme traité
            </button>
          ) : null
        }
      />

      <section className="grid gap-4 sm:grid-cols-3">
        <Summary
          label="Alertes actives"
          value={alerts.length}
          detail="À consulter"
        />
        <Summary
          label="Stocks à vérifier"
          value={stockCount}
          detail="Seuil personnalisé par produit"
        />
        <Summary
          label="Priorité urgente"
          value={urgentCount}
          detail="Ruptures de stock"
        />
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#eee8e2] bg-white">
        <div className="flex items-center gap-3 border-b border-[#f3efeb] px-5 py-5">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#f7f0eb] text-[#a87968]">
            <Bell size={18} />
          </span>
          <div>
            <h2 className="font-semibold text-[#302724]">À traiter</h2>
            <p className="mt-1 text-xs text-[#8d817a]">
              Les alertes ignorées sont masquées jusqu’au rechargement de cette
              démonstration.
            </p>
          </div>
        </div>

        {alerts.length === 0 ? (
          <div className="p-5">
            <EmptyState>
              Tout est à jour : aucune alerte active pour le moment.
            </EmptyState>
          </div>
        ) : (
          <div className="divide-y divide-[#f3efeb]">
            {alerts.map((alert) => {
              const isStock = alert.id.startsWith('stock-')
              const isUrgent = alert.severity === 'Urgent'
              const Icon = isStock ? Package : ShoppingBag
              return (
                <article
                  key={alert.id}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start"
                >
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                      isUrgent
                        ? 'bg-[#fbefed] text-[#b05d54]'
                        : 'bg-[#f7f0eb] text-[#a87968]'
                    }`}
                  >
                    {isUrgent ? (
                      <AlertTriangle size={18} />
                    ) : (
                      <Icon size={18} />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-[#302724]">
                        {alert.title}
                      </h3>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                          isUrgent
                            ? 'bg-[#fbefed] text-[#ad625a]'
                            : alert.severity === 'À surveiller'
                              ? 'bg-[#fbf2df] text-[#9a7436]'
                              : 'bg-[#edf1f8] text-[#637998]'
                        }`}
                      >
                        {alert.severity}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-[#8d817a]">
                      {alert.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => onNavigate(alert.page)}
                        className="rounded-lg bg-[#302724] px-3 py-2 text-xs font-medium text-white hover:bg-[#51413a]"
                      >
                        {alert.actionLabel}
                      </button>
                      <button
                        onClick={() => onDismiss(alert.id)}
                        className="rounded-lg border border-[#eee8e2] px-3 py-2 text-xs font-medium text-[#71655e] hover:bg-[#faf8f6]"
                      >
                        Masquer l’alerte
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}

function Summary({
  label,
  value,
  detail,
}: {
  label: string
  value: number
  detail: string
}) {
  return (
    <article className="rounded-2xl border border-[#eee8e2] bg-white p-5">
      <p className="text-sm text-[#8d817a]">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-[#302724]">{value}</p>
      <p className="mt-2 text-xs text-[#a99c94]">{detail}</p>
    </article>
  )
}
