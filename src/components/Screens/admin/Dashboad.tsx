import {
  ArrowUpRight,
  Boxes,
  CircleDollarSign,
  ClipboardList,
  Users,
} from 'lucide-react'
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

export default function Dashboad() {
  return (
    <div className="space-y-7">
      <AdminPageHeader
        eyebrow="MARDI 27 OCTOBRE 2026"
        title="Bonjour, Awa 👋"
        description="Voici ce qui se passe dans votre boutique aujourd’hui."
      />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Chiffre d’affaires" value="1 250 000 FCFA" icon={<CircleDollarSign />} />
        <SummaryCard label="Commandes" value="24" icon={<ClipboardList />} />
        <SummaryCard label="Produits en boutique" value="18" icon={<Boxes />} />
        <SummaryCard label="Clientes" value="16" icon={<Users />} />
      </section>
      <section className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        <div className="rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-6">
          <div className="mb-7">
            <h2 className="text-lg font-semibold text-[#302724]">
              Ventes de la semaine
            </h2>
            <p className="mt-1 text-sm text-[#8d817a]">
              Une belle progression par rapport à la semaine dernière
            </p>
          </div>
          <div className="flex h-52 items-end justify-between gap-3 border-b border-[#f0ebe6] px-1">
            {weeklySales.map(({ day, value }) => (
              <div
                key={day}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <div
                  className="w-full max-w-10 rounded-t-lg bg-[#c6a18f]"
                  style={{ height: `${value}%` }}
                />
                <span className="pb-2 text-xs text-[#8d817a]">{day}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-6">
          <h2 className="mb-5 text-lg font-semibold text-[#302724]">
            Meilleures ventes
          </h2>
          <div className="space-y-4">
            <ProductSummary rank="01" name="Crème hydratante au karité" sold="32 vendus" price="12 500 FCFA" />
            <ProductSummary rank="02" name="Huile de coco naturelle" sold="24 vendus" price="8 000 FCFA" />
            <ProductSummary rank="03" name="Savon noir traditionnel" sold="18 vendus" price="5 000 FCFA" />
          </div>
        </div>
      </section>
      <section className="overflow-hidden rounded-2xl border border-[#eee8e2] bg-white">
        <div className="px-5 py-5 sm:px-6">
          <h2 className="text-lg font-semibold text-[#302724]">
            Commandes récentes
          </h2>
          <p className="mt-1 text-sm text-[#8d817a]">
            Suivez les dernières commandes de la boutique
          </p>
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
              <tr>
                <td className="px-6 py-4 font-medium text-[#302724]">CMD-1024</td>
                <td className="px-6 py-4 text-[#625650]">Aminata K.</td>
                <td className="px-6 py-4 text-[#8d817a]">27 oct. 2026</td>
                <td className="px-6 py-4 font-medium text-[#302724]">35 500 FCFA</td>
                <td className="px-6 py-4"><StatusBadge status="Nouvelle" /></td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-[#302724]">CMD-1023</td>
                <td className="px-6 py-4 text-[#625650]">Fatou D.</td>
                <td className="px-6 py-4 text-[#8d817a]">26 oct. 2026</td>
                <td className="px-6 py-4 font-medium text-[#302724]">21 000 FCFA</td>
                <td className="px-6 py-4"><StatusBadge status="En préparation" /></td>
              </tr>
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
  icon,
}: {
  label: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <article className="rounded-2xl border border-[#eee8e2] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[#8d817a]">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-[#302724]">{value}</p>
        </div>
        <span className="flex size-10 items-center justify-center rounded-xl bg-[#f7f0eb] text-[#a87968]">
          {icon}
        </span>
      </div>
      <p className="mt-4 flex items-center gap-1 text-xs text-[#71836d]">
        <ArrowUpRight size={14} />
        Comparé au mois dernier
      </p>
    </article>
  )
}

function ProductSummary({
  rank,
  name,
  sold,
  price,
}: {
  rank: string
  name: string
  sold: string
  price: string
}) {
  return (
    <div className="flex items-center gap-3 border-b border-[#f3efeb] pb-4 last:border-0 last:pb-0">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f7f0eb] text-sm font-semibold text-[#a87968]">
        {rank}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-[#302724]">{name}</p>
        <p className="mt-1 text-xs text-[#8d817a]">{sold}</p>
      </div>
      <span className="text-sm font-semibold text-[#302724]">{price}</span>
    </div>
  )
}
