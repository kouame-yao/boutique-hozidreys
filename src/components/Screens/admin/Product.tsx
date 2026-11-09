import { Eye, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { formatPrice } from './adminData'
import { AdminPageHeader } from './AdminShared'

export default function Product() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="CATALOGUE"
        title="Vos produits"
        description="Gérez les soins et cosmétiques proposés dans votre boutique."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-[#302724] px-4 py-3 text-sm font-medium text-white"
          >
            <Plus size={17} />
            Ajouter un produit
          </button>
        }
      />
      <section className="overflow-hidden rounded-2xl border border-[#eee8e2] bg-white">
        <div className="flex flex-col gap-3 border-b border-[#f3efeb] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="relative w-full sm:max-w-sm">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a99c94]"
            />
            <input
              aria-label="Rechercher un produit"
              placeholder="Rechercher un produit..."
              className="w-full rounded-xl border border-[#eee8e2] py-2.5 pl-10 pr-3 text-sm"
            />
          </div>
          <select
            aria-label="Filtrer par catégorie"
            className="rounded-xl border border-[#eee8e2] bg-white px-3 py-2.5 text-sm text-[#625650]"
          >
            <option>Toutes les catégories</option>
            <option>Soins du visage</option>
            <option>Soins du corps</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead className="bg-[#faf8f6] text-xs uppercase tracking-wide text-[#8d817a]">
              <tr>
                <th className="px-5 py-3 font-medium">Produit</th>
                <th className="px-5 py-3 font-medium">Référence</th>
                <th className="px-5 py-3 font-medium">Catégorie</th>
                <th className="px-5 py-3 font-medium">Prix</th>
                <th className="px-5 py-3 font-medium">Stock</th>
                <th className="px-5 py-3 font-medium">Vendus</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f3efeb]">
              <ProductRow
                name="Crème hydratante au karité"
                sku="HOZ-CRE-006"
                category="Soins du visage"
                price={12500}
                stock="14 unités"
                sold="32"
              />
              <ProductRow
                name="Huile de coco naturelle"
                sku="HOZ-HUI-002"
                category="Soins du corps"
                price={8000}
                stock="8 unités"
                sold="24"
              />
              <ProductRow
                name="Savon noir traditionnel"
                sku="HOZ-SAV-011"
                category="Soins du corps"
                price={5000}
                stock="0 unités"
                sold="18"
              />
            </tbody>
          </table>
        </div>
        <p className="border-t border-[#f3efeb] px-5 py-3 text-xs text-[#8d817a]">
          3 produits affichés · Exemple d’interface
        </p>
      </section>
    </div>
  )
}

function ProductRow({
  name,
  sku,
  category,
  price,
  stock,
  sold,
}: {
  name: string
  sku: string
  category: string
  price: number
  stock: string
  sold: string
}) {
  return (
    <tr>
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#f7f0eb] text-lg">
            ✨
          </div>
          <span className="font-medium text-[#302724]">{name}</span>
        </div>
      </td>
      <td className="px-5 py-4 text-[#8d817a]">{sku}</td>
      <td className="px-5 py-4 text-[#625650]">{category}</td>
      <td className="px-5 py-4 font-medium text-[#302724]">
        {formatPrice(price)}
      </td>
      <td className="px-5 py-4 text-[#625650]">{stock}</td>
      <td className="px-5 py-4 text-[#625650]">{sold}</td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-1">
          <button type="button" aria-label={`Voir ${name}`} className="rounded-lg p-2 text-[#71655e] hover:bg-[#faf8f6]">
            <Eye size={16} />
          </button>
          <button type="button" aria-label={`Modifier ${name}`} className="rounded-lg p-2 text-[#71655e] hover:bg-[#f7f0eb]">
            <Pencil size={16} />
          </button>
          <button type="button" aria-label={`Supprimer ${name}`} className="rounded-lg p-2 text-[#a99c94] hover:bg-[#fbefed] hover:text-[#b05d54]">
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  )
}
