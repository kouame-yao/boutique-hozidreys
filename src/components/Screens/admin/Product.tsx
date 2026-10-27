import { Eye, PackagePlus, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { AdminCategory, AdminProduct } from './adminData'
import { formatPrice } from './adminData'
import { AdminPageHeader, EmptyState } from './AdminShared'
import { ProductDetails, ProductEditor, RestockProduct } from './ProductModals'

export default function Product({
  products,
  categories,
  onAddProduct,
  onDeleteProduct,
  onUpdateProduct,
  onRestockProduct,
}: {
  products: AdminProduct[]
  categories: AdminCategory[]
  onAddProduct: () => void
  onDeleteProduct: (id: string) => void
  onUpdateProduct: (product: AdminProduct) => void
  onRestockProduct: (id: string, quantity: number) => void
}) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Toutes les catégories')
  const [detailProduct, setDetailProduct] = useState<AdminProduct | null>(null)
  const [editProduct, setEditProduct] = useState<AdminProduct | null>(null)
  const [restockProduct, setRestockProduct] = useState<AdminProduct | null>(
    null,
  )
  const categoryOptions = [
    'Toutes les catégories',
    ...new Set(products.map((product) => product.category)),
  ]
  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesQuery = `${product.name} ${product.sku}`
          .toLowerCase()
          .includes(query.toLowerCase())
        const matchesCategory =
          category === 'Toutes les catégories' || product.category === category
        return matchesQuery && matchesCategory
      }),
    [category, products, query],
  )

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="CATALOGUE"
        title="Vos produits"
        description="Gérez les soins et cosmétiques proposés dans votre boutique."
        action={
          <button
            onClick={onAddProduct}
            className="inline-flex items-center gap-2 rounded-xl bg-[#302724] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#51413a]"
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
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un produit..."
              className="w-full rounded-xl border border-[#eee8e2] py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[#c6a18f]"
            />
          </div>
          <select
            aria-label="Filtrer par catégorie"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-xl border border-[#eee8e2] bg-white px-3 py-2.5 text-sm text-[#625650] outline-none focus:border-[#c6a18f]"
          >
            {categoryOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="p-5">
            <EmptyState>
              Aucun produit ne correspond à votre recherche.
            </EmptyState>
          </div>
        ) : (
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
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt=""
                            className="size-11 shrink-0 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#f7f0eb] text-lg">
                            ✨
                          </div>
                        )}
                        <button
                          onClick={() => setDetailProduct(product)}
                          className="text-left font-medium text-[#302724] hover:text-[#a87968]"
                        >
                          {product.name}
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[#8d817a]">{product.sku}</td>
                    <td className="px-5 py-4 text-[#625650]">
                      {product.category}
                    </td>
                    <td className="px-5 py-4 font-medium text-[#302724]">
                      {product.promotionalPrice ? (
                        <div>
                          <span className="text-[#ad625a]">
                            {formatPrice(product.promotionalPrice)}
                          </span>
                          <span className="ml-2 text-xs font-normal text-[#a99c94] line-through">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                      ) : (
                        formatPrice(product.price)
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={
                          product.stock <= (product.lowStockThreshold ?? 10)
                            ? 'font-medium text-[#b05d54]'
                            : 'text-[#625650]'
                        }
                      >
                        {product.stock} unités
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[#625650]">{product.sold}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setRestockProduct(product)}
                          aria-label={`Réapprovisionner ${product.name}`}
                          title="Ajouter des unités au stock"
                          className="inline-flex items-center gap-1 rounded-lg border border-[#e7ddd5] bg-[#f7f0eb] px-2.5 py-2 text-xs font-medium text-[#8d6251] transition hover:bg-[#efe2d9]"
                        >
                          <PackagePlus size={15} />
                          <span>Réapprovisionner</span>
                        </button>
                        <button
                          aria-label={`Voir le détail de ${product.name}`}
                          onClick={() => setDetailProduct(product)}
                          className="rounded-lg p-2 text-[#71655e] hover:bg-[#faf8f6]"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          aria-label={`Modifier ${product.name}`}
                          onClick={() => setEditProduct(product)}
                          className="rounded-lg p-2 text-[#71655e] hover:bg-[#f7f0eb] hover:text-[#a87968]"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          aria-label={`Supprimer ${product.name}`}
                          onClick={() => onDeleteProduct(product.id)}
                          className="rounded-lg p-2 text-[#a99c94] transition hover:bg-[#fbefed] hover:text-[#b05d54]"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="border-t border-[#f3efeb] px-5 py-3 text-xs text-[#8d817a]">
          {filteredProducts.length} produit(s) affiché(s) · données de
          démonstration
        </p>
      </section>
      {detailProduct && (
        <ProductDetails
          product={detailProduct}
          onClose={() => setDetailProduct(null)}
          onEdit={() => {
            setEditProduct(detailProduct)
            setDetailProduct(null)
          }}
        />
      )}
      {editProduct && (
        <ProductEditor
          key={editProduct.id}
          product={editProduct}
          categories={categories}
          onClose={() => setEditProduct(null)}
          onSave={(product) => {
            onUpdateProduct(product)
            setEditProduct(null)
          }}
        />
      )}
      {restockProduct && (
        <RestockProduct
          key={restockProduct.id}
          product={restockProduct}
          onClose={() => setRestockProduct(null)}
          onRestock={(quantity) => {
            onRestockProduct(restockProduct.id, quantity)
            setRestockProduct(null)
          }}
        />
      )}
    </div>
  )
}
