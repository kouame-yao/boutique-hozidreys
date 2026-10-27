import {
  BarChart3,
  CalendarDays,
  ClipboardList,
  CircleDollarSign,
  Package,
  Percent,
  ShoppingBag,
  Truck,
  Users,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import type { AdminOrder, AdminProduct } from './adminData'
import { AdminPageHeader, EmptyState, StatusBadge } from './AdminShared'
import { demoOrders, formatPrice } from './adminData'

type Preset = '7' | '30' | '90' | 'year' | 'custom'
type SalesBucket = {
  label: string
  revenue: number
  orders: number
}

const latestOrderDate = demoOrders.reduce(
  (latest, order) => (order.dateISO > latest ? order.dateISO : latest),
  demoOrders[0]?.dateISO ?? '2026-10-27',
)

function shiftDate(date: string, days: number) {
  const shifted = new Date(`${date}T12:00:00Z`)
  shifted.setUTCDate(shifted.getUTCDate() + days)
  return shifted.toISOString().slice(0, 10)
}

function getDefaultRange(days: number) {
  return {
    from: shiftDate(latestOrderDate, -(days - 1)),
    to: latestOrderDate,
  }
}

function formatShortDate(date: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00Z`))
}

function createBuckets(from: string, to: string, orders: AdminOrder[]) {
  const start = new Date(`${from}T12:00:00Z`)
  const end = new Date(`${to}T12:00:00Z`)
  const dayCount = Math.max(
    1,
    Math.floor((end.getTime() - start.getTime()) / 86_400_000) + 1,
  )
  const bucketCount = Math.min(8, dayCount)
  const buckets: SalesBucket[] = Array.from({ length: bucketCount }, (_, i) => {
    const bucketStart = Math.floor((i * dayCount) / bucketCount)
    const bucketEnd = Math.floor(((i + 1) * dayCount) / bucketCount) - 1
    const labelDate = shiftDate(from, bucketStart)
    return {
      label:
        dayCount <= 14
          ? formatShortDate(labelDate)
          : `${formatShortDate(labelDate)} – ${formatShortDate(
              shiftDate(from, Math.max(bucketStart, bucketEnd)),
            )}`,
      revenue: 0,
      orders: 0,
    }
  })

  for (const order of orders) {
    const orderDay = Math.floor(
      (new Date(`${order.dateISO}T12:00:00Z`).getTime() - start.getTime()) /
        86_400_000,
    )
    const bucketIndex = Math.min(
      bucketCount - 1,
      Math.floor((orderDay * bucketCount) / dayCount),
    )
    if (bucketIndex >= 0) {
      buckets[bucketIndex].revenue += order.amount
      buckets[bucketIndex].orders += 1
    }
  }
  return buckets
}

function getProductStats(orders: AdminOrder[], products: AdminProduct[]) {
  const sales = new Map<string, { quantity: number; revenue: number }>()
  for (const order of orders) {
    for (const item of order.items) {
      const product = products.find((entry) => entry.id === item.productId)
      const sale = sales.get(item.productId) ?? { quantity: 0, revenue: 0 }
      sale.quantity += item.quantity
      sale.revenue +=
        (product?.promotionalPrice ?? product?.price ?? 0) * item.quantity
      sales.set(item.productId, sale)
    }
  }
  return products
    .map((product) => ({
      ...product,
      periodQuantity: sales.get(product.id)?.quantity ?? 0,
      periodRevenue: sales.get(product.id)?.revenue ?? 0,
    }))
    .filter((product) => product.periodQuantity > 0)
    .sort((a, b) => b.periodQuantity - a.periodQuantity)
    .slice(0, 5)
}

export default function Analytics({
  orders,
  products,
}: {
  orders: AdminOrder[]
  products: AdminProduct[]
}) {
  const [preset, setPreset] = useState<Preset>('30')
  const [range, setRange] = useState(() => getDefaultRange(30))

  const filteredOrders = useMemo(
    () =>
      orders.filter(
        (order) => order.dateISO >= range.from && order.dateISO <= range.to,
      ),
    [orders, range],
  )
  const completedOrders = filteredOrders.filter(
    (order) => order.status !== 'Annulée',
  )
  const revenue = completedOrders.reduce(
    (total, order) => total + order.amount,
    0,
  )
  const customerCount = new Set(filteredOrders.map((order) => order.customer))
    .size
  const averageOrder = completedOrders.length
    ? Math.round(revenue / completedOrders.length)
    : 0
  const periodDays = Math.max(
    1,
    Math.floor(
      (new Date(`${range.to}T12:00:00Z`).getTime() -
        new Date(`${range.from}T12:00:00Z`).getTime()) /
        86_400_000,
    ) + 1,
  )
  const previousFrom = shiftDate(range.from, -periodDays)
  const previousTo = shiftDate(range.from, -1)
  const previousOrders = orders.filter(
    (order) =>
      order.dateISO >= previousFrom &&
      order.dateISO <= previousTo &&
      order.status !== 'Annulée',
  )
  const previousRevenue = previousOrders.reduce(
    (total, order) => total + order.amount,
    0,
  )
  const revenueChange = previousRevenue
    ? Math.round(((revenue - previousRevenue) / previousRevenue) * 100)
    : null
  const promotionalProducts = products.filter(
    (product) => product.promotionalPrice !== undefined,
  )
  const potentialDiscount = promotionalProducts.reduce(
    (total, product) =>
      total +
      (product.price - (product.promotionalPrice ?? product.price)) *
        product.stock,
    0,
  )
  const stockValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0,
  )
  const lowStockCount = products.filter(
    (product) => product.stock <= (product.lowStockThreshold ?? 10),
  ).length
  const averageItems = completedOrders.length
    ? completedOrders.reduce(
        (total, order) =>
          total + order.items.reduce((count, item) => count + item.quantity, 0),
        0,
      ) / completedOrders.length
    : 0
  const buckets = useMemo(
    () => createBuckets(range.from, range.to, completedOrders),
    [completedOrders, range.from, range.to],
  )
  const maxRevenue = Math.max(1, ...buckets.map((bucket) => bucket.revenue))
  const bestProducts = getProductStats(completedOrders, products)
  const categoryStats = useMemo(() => {
    const stats = new Map<string, { revenue: number; units: number }>()
    for (const order of completedOrders) {
      for (const item of order.items) {
        const product = products.find((entry) => entry.id === item.productId)
        if (!product) continue
        const entry = stats.get(product.category) ?? { revenue: 0, units: 0 }
        entry.revenue +=
          (product.promotionalPrice ?? product.price) * item.quantity
        entry.units += item.quantity
        stats.set(product.category, entry)
      }
    }
    return [...stats.entries()]
      .map(([name, value]) => ({ name, ...value }))
      .sort((a, b) => b.revenue - a.revenue)
  }, [completedOrders, products])
  const topCustomers = useMemo(() => {
    const customerMap = new Map<string, { orders: number; revenue: number }>()
    for (const order of completedOrders) {
      const customer = customerMap.get(order.customer) ?? {
        orders: 0,
        revenue: 0,
      }
      customer.orders += 1
      customer.revenue += order.amount
      customerMap.set(order.customer, customer)
    }
    return [...customerMap.entries()]
      .map(([name, values]) => ({ name, ...values }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
  }, [completedOrders])
  const maxCategoryRevenue = Math.max(
    1,
    ...categoryStats.map((category) => category.revenue),
  )
  const deliveredOrders = filteredOrders.filter(
    (order) => order.status === 'Livrée',
  ).length
  const cancelledOrders = filteredOrders.filter(
    (order) => order.status === 'Annulée',
  ).length
  const inProgressOrders =
    filteredOrders.length - deliveredOrders - cancelledOrders
  const deliveryRate = completedOrders.length
    ? Math.round((deliveredOrders / completedOrders.length) * 100)
    : 0
  const invalidRange = range.from > range.to

  function choosePreset(value: Exclude<Preset, 'custom'>) {
    setPreset(value)
    if (value === 'year') {
      setRange({
        from: `${latestOrderDate.slice(0, 4)}-01-01`,
        to: latestOrderDate,
      })
      return
    }
    setRange(getDefaultRange(Number(value)))
  }

  function setDate(field: 'from' | 'to', value: string) {
    setPreset('custom')
    setRange((current) => ({ ...current, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="PERFORMANCE DE LA BOUTIQUE"
        title="Analytique globale"
        description="Suivez les ventes, les commandes, les clientes et les produits sur la période choisie."
      />

      <section className="rounded-2xl border border-[#eee8e2] bg-white p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#302724]">
          <CalendarDays size={17} className="text-[#a87968]" />
          Filtrer par date
        </div>
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-2">
            {(
              [
                ['7', '7 jours'],
                ['30', '30 jours'],
                ['90', '90 jours'],
                ['year', 'Cette année'],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                onClick={() => choosePreset(value)}
                className={`rounded-xl px-3.5 py-2 text-sm transition ${
                  preset === value
                    ? 'bg-[#302724] font-medium text-white'
                    : 'border border-[#eee8e2] text-[#71655e] hover:bg-[#faf8f6]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex items-center gap-2 text-xs text-[#8d817a]">
              Du
              <input
                aria-label="Date de début"
                type="date"
                value={range.from}
                max={range.to}
                onChange={(event) => setDate('from', event.target.value)}
                className="rounded-xl border border-[#eee8e2] px-3 py-2 text-sm text-[#302724] outline-none focus:border-[#c6a18f]"
              />
            </label>
            <label className="flex items-center gap-2 text-xs text-[#8d817a]">
              Au
              <input
                aria-label="Date de fin"
                type="date"
                value={range.to}
                min={range.from}
                onChange={(event) => setDate('to', event.target.value)}
                className="rounded-xl border border-[#eee8e2] px-3 py-2 text-sm text-[#302724] outline-none focus:border-[#c6a18f]"
              />
            </label>
          </div>
        </div>
        <p className="mt-3 text-xs text-[#a99c94]">
          Données de démonstration disponibles jusqu’au{' '}
          {formatShortDate(latestOrderDate)} 2026.
        </p>
        {invalidRange && (
          <p role="alert" className="mt-2 text-sm text-[#b05d54]">
            La date de début doit précéder la date de fin.
          </p>
        )}
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <MetricCard
          label="Chiffre d’affaires"
          value={formatPrice(revenue)}
          detail={
            revenueChange === null
              ? 'Aucune période précédente comparable'
              : `${revenueChange >= 0 ? '+' : ''}${revenueChange}% vs période précédente`
          }
          icon={CircleDollarSign}
        />
        <MetricCard
          label="Commandes"
          value={String(filteredOrders.length)}
          detail={`${deliveredOrders} livrée(s) · ${inProgressOrders} en cours · ${cancelledOrders} annulée(s)`}
          icon={ClipboardList}
        />
        <MetricCard
          label="Panier moyen"
          value={formatPrice(averageOrder)}
          detail={`${averageItems.toFixed(1)} article(s) par commande en moyenne`}
          icon={ShoppingBag}
        />
        <MetricCard
          label="Clientes"
          value={String(customerCount)}
          detail="Clientes distinctes ayant commandé"
          icon={Users}
        />
        <MetricCard
          label="Produits en promotion"
          value={String(promotionalProducts.length)}
          detail={`Économie potentielle sur le stock : ${formatPrice(potentialDiscount)}`}
          icon={Percent}
        />
        <MetricCard
          label="Taux de livraison"
          value={`${deliveryRate}%`}
          detail={`${deliveredOrders} commande(s) livrée(s)`}
          icon={Truck}
        />
        <MetricCard
          label="Valeur du stock"
          value={formatPrice(stockValue)}
          detail={`${lowStockCount} référence(s) sous le seuil d’alerte`}
          icon={Package}
        />
        <MetricCard
          label="Commandes non annulées"
          value={String(completedOrders.length)}
          detail="Base utilisée pour le chiffre d’affaires"
          icon={BarChart3}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        <div className="rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[#302724]">
              Évolution du chiffre d’affaires
            </h2>
            <p className="mt-1 text-sm text-[#8d817a]">
              Répartition des ventes dans la période
            </p>
          </div>
          {filteredOrders.length === 0 ? (
            <EmptyState>Aucune vente sur cette période.</EmptyState>
          ) : (
            <div className="flex h-64 items-end gap-2 border-b border-[#f0ebe6] px-1 sm:gap-3">
              {buckets.map((bucket) => (
                <div
                  key={bucket.label}
                  className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
                >
                  <span className="hidden text-center text-[10px] text-[#8d817a] sm:block">
                    {bucket.revenue ? formatPrice(bucket.revenue) : ''}
                  </span>
                  <div
                    title={`${bucket.label}: ${formatPrice(bucket.revenue)} (${bucket.orders} commandes)`}
                    className="w-full max-w-12 rounded-t-lg bg-[#c6a18f] transition-colors hover:bg-[#a87968]"
                    style={{
                      height: `${Math.max(3, (bucket.revenue / maxRevenue) * 100)}%`,
                    }}
                  />
                  <span className="max-w-full truncate pb-2 text-[10px] text-[#8d817a] sm:text-xs">
                    {bucket.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-[#302724]">
              Produits les plus vendus
            </h2>
            <p className="mt-1 text-sm text-[#8d817a]">
              Quantités commandées sur cette période
            </p>
          </div>
          {bestProducts.length === 0 ? (
            <EmptyState>Aucun produit vendu sur cette période.</EmptyState>
          ) : (
            <div className="space-y-4">
              {bestProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 border-b border-[#f3efeb] pb-4 last:border-0 last:pb-0"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f7f0eb] text-sm font-semibold text-[#a87968]">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#302724]">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs text-[#8d817a]">
                      {product.periodQuantity} unité(s) · {product.category}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[#302724]">
                    {formatPrice(product.periodRevenue)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <div className="rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-[#302724]">
              Ventes par catégorie
            </h2>
            <p className="mt-1 text-sm text-[#8d817a]">
              Chiffre d’affaires estimé à partir des articles commandés
            </p>
          </div>
          {categoryStats.length === 0 ? (
            <EmptyState>
              Aucune vente par catégorie sur cette période.
            </EmptyState>
          ) : (
            <div className="space-y-5">
              {categoryStats.map((category) => (
                <div key={category.name}>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-[#302724]">
                      {category.name}
                    </span>
                    <span className="text-right text-[#625650]">
                      {formatPrice(category.revenue)} · {category.units}{' '}
                      unité(s)
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#f3efeb]">
                    <div
                      className="h-full rounded-full bg-[#c6a18f]"
                      style={{
                        width: `${(category.revenue / maxCategoryRevenue) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-[#302724]">
              Clientes les plus actives
            </h2>
            <p className="mt-1 text-sm text-[#8d817a]">
              Classement selon le montant commandé sur la période
            </p>
          </div>
          {topCustomers.length === 0 ? (
            <EmptyState>Aucune cliente sur cette période.</EmptyState>
          ) : (
            <div className="divide-y divide-[#f3efeb]">
              {topCustomers.map((customer, index) => (
                <div
                  key={customer.name}
                  className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#f7f0eb] text-xs font-semibold text-[#a87968]">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#302724]">
                      {customer.name}
                    </p>
                    <p className="mt-1 text-xs text-[#8d817a]">
                      {customer.orders} commande(s)
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[#302724]">
                    {formatPrice(customer.revenue)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_1.4fr]">
        <div className="rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-2">
            <BarChart3 size={18} className="text-[#a87968]" />
            <h2 className="text-lg font-semibold text-[#302724]">
              État des commandes
            </h2>
          </div>
          <div className="space-y-4">
            {(
              [
                ['Nouvelle', 'bg-[#8162a5]'],
                ['En préparation', 'bg-[#c39a4a]'],
                ['En livraison', 'bg-[#7890b5]'],
                ['Livrée', 'bg-[#94a58a]'],
                ['Annulée', 'bg-[#b05d54]'],
              ] as const
            ).map(([status, color]) => {
              const count = filteredOrders.filter(
                (order) => order.status === status,
              ).length
              return (
                <div key={status}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-[#625650]">{status}</span>
                    <span className="font-medium text-[#302724]">{count}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#f3efeb]">
                    <div
                      className={`h-full rounded-full ${color}`}
                      style={{
                        width: `${
                          filteredOrders.length
                            ? (count / filteredOrders.length) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#eee8e2] bg-white">
          <div className="px-5 py-5 sm:px-6">
            <h2 className="text-lg font-semibold text-[#302724]">
              Détail des commandes
            </h2>
            <p className="mt-1 text-sm text-[#8d817a]">
              {filteredOrders.length} commande(s) entre le{' '}
              {formatShortDate(range.from)} et le {formatShortDate(range.to)}
            </p>
          </div>
          {filteredOrders.length === 0 ? (
            <div className="px-5 pb-5">
              <EmptyState>Aucune commande sur cette période.</EmptyState>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-[#faf8f6] text-xs uppercase tracking-wide text-[#8d817a]">
                  <tr>
                    <th className="px-5 py-3 font-medium">Commande</th>
                    <th className="px-5 py-3 font-medium">Cliente</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Montant</th>
                    <th className="px-5 py-3 font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3efeb]">
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-5 py-3.5 font-medium text-[#302724]">
                        {order.id}
                      </td>
                      <td className="px-5 py-3.5 text-[#625650]">
                        {order.customer}
                      </td>
                      <td className="px-5 py-3.5 text-[#8d817a]">
                        {order.date}
                      </td>
                      <td className="px-5 py-3.5 font-medium text-[#302724]">
                        {formatPrice(order.amount)}
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
      <p className="text-center text-xs text-[#a99c94]">
        Ces indicateurs sont calculés à partir des données fictives de
        démonstration.
      </p>
    </div>
  )
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string
  value: string
  detail: string
  icon: typeof CircleDollarSign
}) {
  return (
    <article className="rounded-2xl border border-[#eee8e2] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[#8d817a]">{label}</p>
          <p className="mt-2 text-xl font-semibold text-[#302724] sm:text-2xl">
            {value}
          </p>
        </div>
        <span className="flex size-10 items-center justify-center rounded-xl bg-[#f7f0eb] text-[#a87968]">
          <Icon size={20} strokeWidth={1.7} />
        </span>
      </div>
      <p className="mt-4 text-xs text-[#8d817a]">{detail}</p>
    </article>
  )
}
