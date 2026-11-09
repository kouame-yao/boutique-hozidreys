import DeleteDialog from '#/components/DeleteDialog'
import { useAllCat } from '#/hook/admin-query-hook/categorie'
import {
  useAllProd,
  useDeleteProd,
  useUpdateProd,
} from '#/hook/admin-query-hook/product'
import type { AdminPage } from '#/hook/current-page-admin'
import type { productType } from '#/schema'
import { Eye, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { formatPrice } from './adminData'
import { AdminPageHeader } from './AdminShared'
import { ProductDetails, ProductEditor } from './ProductModals'

export default function Product({
  setPageLayout,
}: {
  setPageLayout: (value: AdminPage) => void
}) {
  const [fieldValue, setFieldValue] = useState({
    seachInput: '',
    seachSelect: '',
  })

  const [productItems, setProductItems] = useState<productType | null>(null)
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false)
  const [isOpenEdit, setIsOpentEdit] = useState<boolean>(false)

  const allProductQuery = useAllProd()
  const dataProductQuery = allProductQuery.data ?? []
  const updateProductMutation = useUpdateProd()
  const deleteProductMutation = useDeleteProd()
  const allCategorieQuery = useAllCat()
  const dataCategorieQuery = allCategorieQuery.data ?? []
  const arraySelect = dataCategorieQuery.map((cat) => {
    return {
      name: cat.name,
      id: cat.id,
    }
  })

  const productFilter = useMemo(() => {
    return dataProductQuery.filter((cat) => {
      if (fieldValue.seachInput)
        return cat.name
          .toLocaleLowerCase()
          .includes(fieldValue.seachInput.toLocaleLowerCase())
      if (fieldValue.seachSelect)
        return cat.category
          .toLocaleLowerCase()
          .includes(fieldValue.seachSelect.toLocaleLowerCase())

      return cat
    })
  }, [dataProductQuery, fieldValue])

  const onOpenDetail = (productItems: productType) => {
    setIsOpenDetail(true)
    setProductItems(productItems)
  }
  const onOpenEdit = (productItems: productType) => {
    setIsOpentEdit(true)
    setProductItems(productItems)
  }

  const onsubmitUpdateProduct = (data: Partial<productType>) => {
    updateProductMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Produit modifier avec succès')
        setIsOpentEdit(false)
      },
      onError: (error) => {
        console.log(error)
        toast.error('Une erreur est survenue')
      },
    })
  }
  const onsubmitDeleteProduct = (id: string) => {
    deleteProductMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Produit supprimer avec succès')
        setIsOpentEdit(false)
      },
      onError: (error) => {
        console.log(error)
        toast.error('Une erreur est survenue')
      },
    })
  }
  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="CATALOGUE"
        title="Vos produits"
        description="Gérez les soins et cosmétiques proposés dans votre boutique."
        action={
          <button
            onClick={() => setPageLayout('new-product')}
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
              value={fieldValue.seachInput}
              onChange={(e) =>
                setFieldValue({ ...fieldValue, seachInput: e.target.value })
              }
              aria-label="Rechercher un produit"
              placeholder="Rechercher un produit..."
              className="w-full rounded-xl border border-[#eee8e2] py-2.5 pl-10 pr-3 text-sm"
            />
          </div>
          <select
            onChange={(e) =>
              setFieldValue({ ...fieldValue, seachSelect: e.target.value })
            }
            aria-label="Filtrer par catégorie"
            className="rounded-xl border border-[#eee8e2] bg-white px-3 py-2.5 text-sm text-[#625650]"
          >
            <option value={''}>Toutes les catégories</option>
            {arraySelect.map((cat) => (
              <option value={cat.id}>{cat.name}</option>
            ))}
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
              {productFilter.map((prod) => {
                return (
                  <ProductRow
                    key={prod.id}
                    product={prod}
                    onOpenDetail={onOpenDetail}
                    onOpenEdit={onOpenEdit}
                    onDelete={onsubmitDeleteProduct}
                    isloading={deleteProductMutation.isPending}
                  />
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="border-t border-[#f3efeb] px-5 py-3 text-xs text-[#8d817a]">
          {dataProductQuery.length} produits affichés · Exemple d’interface
        </p>
      </section>
      {isOpenDetail && (
        <ProductDetails
          productItems={productItems}
          setIsOpenDetail={setIsOpenDetail}
          setIsOpentEdit={setIsOpentEdit}
        />
      )}
      {isOpenEdit && (
        <ProductEditor
          productItems={productItems}
          setIsOpentEdit={setIsOpentEdit}
          onUpdateProduct={onsubmitUpdateProduct}
          isloading={updateProductMutation.isPending}
        />
      )}
    </div>
  )
}

function ProductRow({
  product,
  onOpenEdit,
  onOpenDetail,
  onDelete,
  isloading,
}: {
  product: productType
  onOpenEdit: (value: productType) => void
  onOpenDetail: (value: productType) => void
  onDelete: (value: string) => void
  isloading: boolean
}) {
  const allCategorieQuery = useAllCat()
  const dataCategorieQuery = allCategorieQuery.data ?? []
  const [isOpenDeleteAlert, setOpenDeleteAlert] = useState(false)
  const confirmDelete = () => {
    onDelete(product.id as string)
  }
  if (isOpenDeleteAlert) {
    return (
      <DeleteDialog
        onConfirm={confirmDelete}
        isOpen={isOpenDeleteAlert}
        onCancel={setOpenDeleteAlert}
        loading={isloading}
      />
    )
  }

  return (
    <tr>
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#f7f0eb] text-lg">
            ✨
          </div>
          <span className="font-medium text-[#302724]">{product.name}</span>
        </div>
      </td>
      <td className="px-5 py-4 text-[#8d817a]">{product.sku}</td>
      <td className="px-5 py-4 text-[#625650]">
        {dataCategorieQuery.find((cat) => cat.id === product.category)?.name}
      </td>
      <td className="px-5 py-4 font-medium text-[#302724]">
        {formatPrice(product.price)}
      </td>
      <td className="px-5 py-4 text-[#625650]">{product.stock}</td>
      <td className="px-5 py-4 text-[#625650]">{product.sold}</td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onOpenDetail(product)}
            type="button"
            aria-label={`Voir ${name}`}
            className="rounded-lg p-2 text-[#71655e] hover:bg-[#faf8f6]"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onOpenEdit(product)}
            type="button"
            aria-label={`Modifier ${name}`}
            className="rounded-lg p-2 text-[#71655e] hover:bg-[#f7f0eb]"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => setOpenDeleteAlert(true)}
            type="button"
            aria-label={`Supprimer ${name}`}
            className="rounded-lg p-2 text-[#a99c94] hover:bg-[#fbefed] hover:text-[#b05d54]"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  )
}
