import { BadgeCheck, CalendarDays, Eye, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { AdminOrder, AdminProduct } from './adminData'
import { formatPrice } from './adminData'
import { AdminPageHeader, EmptyState, StatusBadge } from './AdminShared'

const statuses: AdminOrder['status'][] = [
  'Nouvelle',
  'En préparation',
  'En livraison',
  'Livrée',
  'Annulée',
]

export default function Orders({
  orders,
  products,
  onUpdateStatus,
}: {
  orders: AdminOrder[]
  products: AdminProduct[]
  onUpdateStatus: (id: string, status: AdminOrder['status']) => void
}) {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('Toutes')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null)
  const [deliveryConfirmation, setDeliveryConfirmation] =
    useState<AdminOrder | null>(null)

  const visibleOrders = useMemo(
    () =>
      orders.filter((order) => {
        const matchesSearch =
          `${order.id} ${order.customer} ${order.phone ?? ''}`
            .toLowerCase()
            .includes(query.toLowerCase())
        const matchesStatus =
          statusFilter === 'Toutes' || order.status === statusFilter
        const matchesFrom = !dateFrom || order.dateISO >= dateFrom
        const matchesTo = !dateTo || order.dateISO <= dateTo
        return matchesSearch && matchesStatus && matchesFrom && matchesTo
      }),
    [dateFrom, dateTo, orders, query, statusFilter],
  )

  const counts = useMemo(
    () =>
      statuses.reduce(
        (result, status) => {
          result[status] = orders.filter(
            (order) => order.status === status,
          ).length
          return result
        },
        {} as Record<AdminOrder['status'], number>,
      ),
    [orders],
  )

  function updateStatus(order: AdminOrder, status: AdminOrder['status']) {
    if (order.status === 'Livrée') return
    if (status === 'Livrée') {
      setDeliveryConfirmation(order)
      return
    }
    onUpdateStatus(order.id, status)
    if (selectedOrder?.id === order.id) {
      setSelectedOrder({ ...order, status })
    }
  }

  function confirmDelivery() {
    if (!deliveryConfirmation) return
    const order = deliveryConfirmation
    onUpdateStatus(order.id, 'Livrée')
    if (selectedOrder?.id === order.id) {
      setSelectedOrder({ ...order, status: 'Livrée' })
    }
    setDeliveryConfirmation(null)
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="VENTES & EXPÉDITION"
        title="Gestion des commandes"
        description="Consultez les commandes, suivez leur préparation et mettez à jour leur statut."
      />

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() =>
              setStatusFilter(statusFilter === status ? 'Toutes' : status)
            }
            className={`rounded-2xl border p-4 text-left transition ${
              statusFilter === status
                ? 'border-[#c6a18f] bg-[#f7f0eb]'
                : 'border-[#eee8e2] bg-white hover:border-[#ddcec3]'
            }`}
          >
            <p className="text-xs text-[#8d817a]">{status}</p>
            <p className="mt-1 text-2xl font-semibold text-[#302724]">
              {counts[status]}
            </p>
          </button>
        ))}
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#eee8e2] bg-white">
        <div className="flex flex-col gap-3 border-b border-[#f3efeb] p-4 xl:flex-row xl:items-center xl:justify-between sm:p-5">
          <div className="relative w-full xl:max-w-xs">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a99c94]"
            />
            <input
              aria-label="Rechercher une commande ou une cliente"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="N° commande, cliente, téléphone..."
              className="w-full rounded-xl border border-[#eee8e2] py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#c6a18f]"
            />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              aria-label="Filtrer par statut"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-xl border border-[#eee8e2] bg-white px-3 py-2.5 text-sm text-[#625650] outline-none focus:border-[#c6a18f]"
            >
              <option value="Toutes">Tous les statuts</option>
              {statuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
            <label className="flex items-center gap-2 rounded-xl border border-[#eee8e2] px-3 text-xs text-[#8d817a]">
              <CalendarDays size={15} />
              <span>Du</span>
              <input
                aria-label="Date de début des commandes"
                type="date"
                value={dateFrom}
                max={dateTo || undefined}
                onChange={(event) => setDateFrom(event.target.value)}
                className="min-w-0 py-2 text-sm text-[#302724] outline-none"
              />
            </label>
            <label className="flex items-center gap-2 rounded-xl border border-[#eee8e2] px-3 text-xs text-[#8d817a]">
              <span>Au</span>
              <input
                aria-label="Date de fin des commandes"
                type="date"
                value={dateTo}
                min={dateFrom || undefined}
                onChange={(event) => setDateTo(event.target.value)}
                className="min-w-0 py-2 text-sm text-[#302724] outline-none"
              />
            </label>
          </div>
        </div>

        {visibleOrders.length === 0 ? (
          <div className="p-5">
            <EmptyState>Aucune commande ne correspond aux filtres.</EmptyState>
          </div>
        ) : (
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
                {visibleOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-5 py-4 font-medium text-[#302724]">
                      {order.id}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-[#302724]">
                        {order.customer}
                      </p>
                      <p className="mt-1 text-xs text-[#8d817a]">
                        {order.phone ?? 'Téléphone non renseigné'}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-[#625650]">{order.date}</td>
                    <td className="px-5 py-4 text-[#625650]">
                      {order.items.reduce(
                        (total, item) => total + item.quantity,
                        0,
                      )}
                    </td>
                    <td className="px-5 py-4 font-medium text-[#302724]">
                      {formatPrice(order.amount)}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          aria-label={`Voir le détail de ${order.id}`}
                          className="rounded-lg border border-[#eee8e2] p-2 text-[#71655e] hover:bg-[#faf8f6]"
                        >
                          <Eye size={16} />
                        </button>
                        <select
                          aria-label={`Modifier le statut de ${order.id}`}
                          value={order.status}
                          disabled={order.status === 'Livrée'}
                          onChange={(event) =>
                            updateStatus(
                              order,
                              event.target.value as AdminOrder['status'],
                            )
                          }
                          className="max-w-40 rounded-lg border border-[#eee8e2] bg-white px-2 py-2 text-xs outline-none focus:border-[#c6a18f] disabled:cursor-not-allowed disabled:bg-[#f3f1ef] disabled:text-[#a99c94]"
                        >
                          {statuses.map((status) => (
                            <option key={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="border-t border-[#f3efeb] px-5 py-3 text-xs text-[#8d817a]">
          {visibleOrders.length} commande(s) affichée(s) · données fictives
          modifiables pendant cette session
        </p>
      </section>

      {selectedOrder && (
        <div
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedOrder(null)
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#302724]/40 p-4"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-detail-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-widest text-[#a87968]">
                  DÉTAIL DE COMMANDE
                </p>
                <h2
                  id="order-detail-title"
                  className="mt-2 text-2xl font-semibold text-[#302724]"
                >
                  {selectedOrder.id}
                </h2>
                <p className="mt-1 text-sm text-[#8d817a]">
                  Passée le {selectedOrder.date}
                </p>
              </div>
              <button
                aria-label="Fermer le détail"
                onClick={() => setSelectedOrder(null)}
                className="rounded-xl border border-[#eee8e2] p-2 text-[#71655e]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoCard title="Cliente">
                <p className="font-medium text-[#302724]">
                  {selectedOrder.customer}
                </p>
                <p>{selectedOrder.phone ?? 'Téléphone non renseigné'}</p>
                <p>{selectedOrder.address ?? 'Adresse non renseignée'}</p>
              </InfoCard>
              <InfoCard title="Suivi">
                <StatusBadge status={selectedOrder.status} />
                <p className="mt-3">
                  Paiement : {selectedOrder.paymentMethod ?? 'Non renseigné'}
                </p>
                {selectedOrder.trackingNumber && (
                  <p>Suivi : {selectedOrder.trackingNumber}</p>
                )}
              </InfoCard>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 font-semibold text-[#302724]">
                Articles commandés
              </h3>
              <div className="divide-y divide-[#f3efeb] rounded-xl border border-[#eee8e2] px-4">
                {selectedOrder.items.map((item) => {
                  const product = products.find(
                    (entry) => entry.id === item.productId,
                  )
                  return (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between gap-3 py-3 text-sm"
                    >
                      <div>
                        <p className="font-medium text-[#302724]">
                          {product?.name ?? 'Produit retiré du catalogue'}
                        </p>
                        <p className="mt-1 text-xs text-[#8d817a]">
                          {item.quantity} ×{' '}
                          {formatPrice(
                            product?.promotionalPrice ?? product?.price ?? 0,
                          )}
                        </p>
                      </div>
                      <p className="font-medium text-[#302724]">
                        {formatPrice(
                          (product?.promotionalPrice ?? product?.price ?? 0) *
                            item.quantity,
                        )}
                      </p>
                    </div>
                  )
                })}
                <div className="flex justify-between py-4 text-sm font-semibold text-[#302724]">
                  <span>Total de la commande</span>
                  <span>{formatPrice(selectedOrder.amount)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-[#f3efeb] pt-5 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-3 text-sm text-[#625650]">
                Mettre à jour le statut
                <select
                  value={selectedOrder.status}
                  disabled={selectedOrder.status === 'Livrée'}
                  onChange={(event) =>
                    updateStatus(
                      selectedOrder,
                      event.target.value as AdminOrder['status'],
                    )
                  }
                  className="rounded-xl border border-[#eee8e2] bg-white px-3 py-2 text-sm outline-none focus:border-[#c6a18f] disabled:cursor-not-allowed disabled:bg-[#f3f1ef] disabled:text-[#a99c94]"
                >
                  {statuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </label>
              {selectedOrder.status === 'Livrée' && (
                <p className="text-xs text-[#71836d]">
                  Commande livrée : les actions sont verrouillées.
                </p>
              )}
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-xl bg-[#302724] px-4 py-2.5 text-sm font-medium text-white"
              >
                Fermer
              </button>
            </div>
          </section>
        </div>
      )}
      {deliveryConfirmation && (
        <div
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setDeliveryConfirmation(null)
            }
          }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#302724]/45 p-4"
        >
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-delivery-title"
            aria-describedby="confirm-delivery-description"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#edf4eb] text-[#5b7655]">
              <BadgeCheck size={24} />
            </div>
            <h2
              id="confirm-delivery-title"
              className="mt-4 text-center text-xl font-semibold text-[#302724]"
            >
              Confirmer la livraison ?
            </h2>
            <p
              id="confirm-delivery-description"
              className="mt-2 text-center text-sm leading-6 text-[#71655e]"
            >
              Confirmez-vous que la commande{' '}
              <span className="font-semibold text-[#302724]">
                {deliveryConfirmation.id}
              </span>{' '}
              de {deliveryConfirmation.customer} a bien été livrée ? Une fois
              confirmée, les actions sur cette commande seront verrouillées.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => setDeliveryConfirmation(null)}
                className="rounded-xl border border-[#eee8e2] px-4 py-2.5 text-sm font-medium text-[#625650] hover:bg-[#faf8f6]"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelivery}
                className="rounded-xl bg-[#71836d] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#5b7655]"
              >
                Oui, confirmer la livraison
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

function InfoCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl bg-[#faf8f6] p-4 text-sm leading-6 text-[#71655e]">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#a87968]">
        {title}
      </p>
      {children}
    </div>
  )
}
