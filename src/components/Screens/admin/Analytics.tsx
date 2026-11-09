import {
  BarChart3,
  CalendarDays,
  CircleDollarSign,
  Package,
  ShoppingBag,
  Users,
} from 'lucide-react'
import { AdminPageHeader } from './AdminShared'

const chartBars = [
  ['1–5 oct.', 48],
  ['6–10 oct.', 74],
  ['11–15 oct.', 58],
  ['16–20 oct.', 92],
  ['21–27 oct.', 68],
] as const

export default function Analytics() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="PERFORMANCE"
        title="Analyses & statistiques"
        description="Suivez les ventes et les performances de votre boutique."
        action={
          <label className="flex items-center gap-2 rounded-xl border border-[#eee8e2] bg-white px-4 py-3 text-sm text-[#625650]">
            <CalendarDays size={16} />
            <select className="bg-transparent outline-none" defaultValue="30">
              <option value="7">7 derniers jours</option>
              <option value="30">30 derniers jours</option>
              <option value="90">90 derniers jours</option>
            </select>
          </label>
        }
      />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Chiffre d’affaires" value="2 450 000 FCFA" icon={<CircleDollarSign />} detail="+12 % ce mois" />
        <Metric label="Commandes" value="86" icon={<ShoppingBag />} detail="Sur la période" />
        <Metric label="Panier moyen" value="28 488 FCFA" icon={<BarChart3 />} detail="Toutes commandes" />
        <Metric label="Clientes" value="42" icon={<Users />} detail="Clientes actives" />
      </section>
      <section className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-[#302724]">
            Évolution des ventes
          </h2>
          <p className="mt-1 text-sm text-[#8d817a]">
            Chiffre d’affaires par période
          </p>
          <div className="mt-8 flex h-64 items-end justify-around gap-4 border-b border-[#f0ebe6]">
            {chartBars.map(([label, height]) => (
              <div
                key={label}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <div
                  className="w-full max-w-14 rounded-t-lg bg-[#c6a18f]"
                  style={{ height: `${height}%` }}
                />
                <span className="pb-2 text-center text-xs text-[#8d817a]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-[#302724]">
            Répartition des commandes
          </h2>
          <div className="mt-6 space-y-5">
            <Progress label="Livrées" value="52 commandes" percent="72%" />
            <Progress label="En préparation" value="12 commandes" percent="42%" />
            <Progress label="En livraison" value="8 commandes" percent="28%" />
            <Progress label="Nouvelles" value="14 commandes" percent="35%" />
          </div>
        </div>
      </section>
      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#eee8e2] bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold text-[#302724]">
            Produits les plus vendus
          </h2>
          <ProductRow name="Crème hydratante au karité" quantity="32 unités" />
          <ProductRow name="Huile de coco naturelle" quantity="24 unités" />
          <ProductRow name="Savon noir traditionnel" quantity="18 unités" />
        </div>
        <div className="rounded-2xl border border-[#eee8e2] bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold text-[#302724]">
            Valeur du stock
          </h2>
          <div className="flex items-center gap-4 rounded-xl bg-[#faf8f6] p-5">
            <Package className="text-[#a87968]" size={28} />
            <div>
              <p className="text-2xl font-semibold text-[#302724]">
                875 000 FCFA
              </p>
              <p className="mt-1 text-sm text-[#8d817a]">
                Valeur totale des produits en stock
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Metric({
  label,
  value,
  icon,
  detail,
}: {
  label: string
  value: string
  icon: React.ReactNode
  detail: string
}) {
  return (
    <article className="rounded-2xl border border-[#eee8e2] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[#8d817a]">{label}</p>
          <p className="mt-2 text-xl font-semibold text-[#302724]">{value}</p>
        </div>
        <span className="flex size-10 items-center justify-center rounded-xl bg-[#f7f0eb] text-[#a87968]">
          {icon}
        </span>
      </div>
      <p className="mt-4 text-xs text-[#71836d]">{detail}</p>
    </article>
  )
}

function Progress({
  label,
  value,
  percent,
}: {
  label: string
  value: string
  percent: string
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium text-[#302724]">{label}</span>
        <span className="text-[#8d817a]">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#f3efeb]">
        <div className="h-full rounded-full bg-[#c6a18f]" style={{ width: percent }} />
      </div>
    </div>
  )
}

function ProductRow({ name, quantity }: { name: string; quantity: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[#f3efeb] py-3 last:border-0">
      <span className="text-sm font-medium text-[#302724]">{name}</span>
      <span className="text-sm text-[#8d817a]">{quantity}</span>
    </div>
  )
}
