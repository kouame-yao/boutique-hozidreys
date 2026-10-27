import {
  ArrowDownRight,
  ArrowUpRight,
  Boxes,
  CircleDollarSign,
  ClipboardList,
  Users,
} from 'lucide-react'
import type { AdminOrder, AdminProduct } from './adminData'
import { formatPrice } from './adminData'
import { AdminPageHeader, StatusBadge } from './AdminShared'

const weeklySales = [
  { day: 'Lun', value: 42 },
  { day: 'Mar', value: 68 },
  { day: 'Mer', value: 52 },
  { day: 'Jeu', value: 84 },
  { day: 'Ven', value: 61 },
  { day: 'Sam', value: 100 },
  { day: 'Dim', value: 76 },
]

export default function Dashboad({
  orders,
  products,
}: {
  orders: AdminOrder[]
  products: AdminProduct[]
}) {
  const activeOrders = orders.filter((order) => order.status !== 'Annulée')
  const revenue = activeOrders.reduce((sum, order) => sum + order.amount, 0)
  const customerCount = new Set(orders.map((order) => order.customer)).size
  const recentOrders = [...orders]
    .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
    .slice(0, 4)
  const bestSellers = [...products].sort((a, b) => b.sold - a.sold).slice(0, 3)

  return (
    <div className="space-y-7">
      <AdminPageHeader
        eyebrow="MARDI 27 OCTOBRE 2026"
        title="Bonjour, Awa 👋"
        description="Voici ce qui se passe dans votre boutique aujourd’hui."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Chiffre d’affaires"
          value={formatPrice(revenue)}
          detail={`${activeOrders.length} commandes non annulées`}
          icon={CircleDollarSign}
          positive
        />
        <SummaryCard
          label="Commandes"
          value={String(orders.length)}
          detail={`${orders.filter((order) => order.status === 'Nouvelle').length} nouvelle(s) à traiter`}
          icon={ClipboardList}
          positive
        />
        <SummaryCard
          label="Produits en boutique"
          value={String(products.length)}
          detail={`${products.filter((product) => product.stock <= (product.lowStockThreshold ?? 10)).length} sous le seuil d’alerte`}
          icon={Boxes}
        />
        <SummaryCard
          label="Clientes"
          value={String(customerCount)}
          detail="Clientes ayant passé commande"
          icon={Users}
          positive
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        <div className="rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-6">
          <div className="mb-7 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-[#302724]">
                Ventes de la semaine
              </h2>
              <p className="mt-1 text-sm text-[#8d817a]">
                Une belle progression par rapport à la semaine dernière
              </p>
            </div>
            <span className="rounded-full bg-[#f7f0eb] px-3 py-1.5 text-xs font-medium text-[#a87968]">
              1 – 7 juin
            </span>
          </div>
          <div className="flex h-52 items-end justify-between gap-3 border-b border-[#f0ebe6] px-1">
            {weeklySales.map(({ day, value }) => (
              <div
                key={day}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <div
                  className="w-full max-w-10 rounded-t-lg bg-[#c6a18f] transition-colors hover:bg-[#a87968]"
                  style={{ height: `${value}%` }}
                  title={`${value}% des ventes`}
                />
                <span className="pb-2 text-xs text-[#8d817a]">{day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-[#302724]">
              Meilleures ventes
            </h2>
            <p className="mt-1 text-sm text-[#8d817a]">
              Les soins préférés de vos clientes
            </p>
          </div>
          <div className="space-y-4">
            {bestSellers.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center gap-3 border-b border-[#f3efeb] pb-4 last:border-0 last:pb-0"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f7f0eb] text-sm font-semibold text-[#a87968]">
                  0{index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#302724]">
                    {product.name}
                  </p>
                  <p className="mt-1 text-xs text-[#8d817a]">
                    {product.sold} vendus
                  </p>
                </div>
                <span className="text-sm font-semibold text-[#302724]">
                  {formatPrice(product.price)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#eee8e2] bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-6">
          <div>
            <h2 className="text-lg font-semibold text-[#302724]">
              Commandes récentes
            </h2>
            <p className="mt-1 text-sm text-[#8d817a]">
              Suivez les dernières commandes de la boutique
            </p>
          </div>
          <span className="text-sm font-medium text-[#a87968]">
            4 dernières commandes
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-[#faf8f6] text-xs uppercase tracking-wide text-[#8d817a]">
              <tr>
                <th className="px-6 py-3 font-medium">Commande</th>
                <th className="px-6 py-3 font-medium">Cliente</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Montant</th>
                <th className="px-6 py-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f3efeb]">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 font-medium text-[#302724]">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-[#625650]">{order.customer}</td>
                  <td className="px-6 py-4 text-[#8d817a]">{order.date}</td>
                  <td className="px-6 py-4 font-medium text-[#302724]">
                    {formatPrice(order.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function SummaryCard({
  label,
  value,
  detail,
  icon: Icon,
  positive = false,
}: {
  label: string
  value: string
  detail: string
  icon: typeof CircleDollarSign
  positive?: boolean
}) {
  return (
    <article className="rounded-2xl border border-[#eee8e2] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[#8d817a]">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-[#302724]">{value}</p>
        </div>
        <span className="flex size-10 items-center justify-center rounded-xl bg-[#f7f0eb] text-[#a87968]">
          <Icon size={20} strokeWidth={1.7} />
        </span>
      </div>
      <p className="mt-4 flex items-center gap-1 text-xs text-[#71836d]">
        {positive ? (
          <ArrowUpRight size={14} />
        ) : (
          <ArrowDownRight size={14} className="text-[#a87968]" />
        )}
        {detail}
      </p>
    </article>
  )
}
