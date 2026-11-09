import FormField from '#/components/FormField'
import Loader from '#/components/Loader'
import { useAllProd } from '#/hook/admin-query-hook/product'
import { useAddStock, useAllStock } from '#/hook/admin-query-hook/stock'
import { stockMouvementSchema, type stockMouvementType } from '#/schema'
import { formatDate } from '#/utils/FormatDate'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowDownToLine, ArrowUpFromLine, Package, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { AdminPageHeader } from './AdminShared'

export default function Inventory() {
  const [seachInput, setSeachInput] = useState('')
  const [typeMouvement, setTypeMouvement] = useState<'Ajout' | 'Retrait'>(
    'Ajout',
  )
  const addStockMutation = useAddStock()
  const allProductQuery = useAllProd()
  const dataProductQuery = allProductQuery.data ?? []
  const allStockQuery = useAllStock()
  const dataStockQuery = allStockQuery.data ?? []

  const addStockForm = useForm({ resolver: zodResolver(stockMouvementSchema) })
  let errors = addStockForm.formState.errors
  const watchProductId = addStockForm.watch('productId')
  addStockForm.setValue(
    'productName',
    dataProductQuery.find((prod) => prod.id === watchProductId)?.name as string,
  )
  addStockForm.setValue('type', typeMouvement)
  useEffect(() => {}, [addStockForm, typeMouvement, watchProductId])

  const stockFilter = useMemo(() => {
    return dataStockQuery.filter((stock) => {
      if (seachInput) {
        return (
          stock.productName
            .toLocaleLowerCase()
            .includes(seachInput.toLocaleLowerCase()) ||
          stock.type
            .toLocaleLowerCase()
            .includes(seachInput.toLocaleLowerCase())
        )
      }
      return stock
    })
  }, [seachInput, dataStockQuery])
  const onsubmitAddStock = (data: stockMouvementType) => {
    addStockMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Stock ajouter avec succès')
        addStockForm.reset({
          productId: '',
          productName: '',
          quantity: 0,
          description: '',
        })
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
        eyebrow="GESTION DES INVENTAIRES"
        title="Mouvements de stock"
        description="Consultez les mouvements et préparez les opérations de stock."
      />
      <section className="grid gap-4 sm:grid-cols-3">
        <SummaryCard label="Références produits" value="18" />
        <SummaryCard label="Unités en stock" value="246" />
        <SummaryCard label="Sous le seuil d’alerte" value="3" alert />
      </section>
      <section className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="overflow-hidden rounded-2xl border border-[#eee8e2] bg-white">
          <div className="flex flex-col gap-3 border-b border-[#f3efeb] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-[#302724]">
                Historique des mouvements
              </h2>
              <p className="mt-1 text-xs text-[#8d817a]">
                Exemple des dernières opérations enregistrées.
              </p>
            </div>
            <input
              value={seachInput}
              onChange={(e) => setSeachInput(e.target.value)}
              aria-label="Rechercher un mouvement"
              placeholder="Rechercher..."
              className="w-full rounded-xl border border-[#eee8e2] px-3 py-2.5 text-sm sm:max-w-56"
            />
          </div>
          {stockFilter.map((stock) => (
            <MovementRow stockItem={stock} />
          ))}
        </div>
        <form
          onSubmit={addStockForm.handleSubmit(onsubmitAddStock)}
          className="space-y-4 rounded-2xl border border-[#eee8e2] bg-white p-5 sm:p-6"
        >
          <div>
            <h2 className="font-semibold text-[#302724]">
              Enregistrer un mouvement
            </h2>
            <p className="mt-1 text-sm text-[#8d817a]">
              Saisissez les informations du mouvement.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-[#f7f5f2] p-1">
            <button
              onClick={() => setTypeMouvement('Ajout')}
              type="button"
              className={`rounded-lg  px-3 py-2.5 text-sm font-medium text-[#302724] ${typeMouvement === 'Ajout' && 'bg-white shadow-sm '}`}
            >
              Ajouter
            </button>
            <button
              onClick={() => setTypeMouvement('Retrait')}
              type="button"
              className={`rounded-lg  px-3 py-2.5 text-sm font-medium text-[#302724] ${typeMouvement === 'Retrait' && 'bg-white shadow-sm '}`}
            >
              Retirer
            </button>
          </div>
          <FormField label="Produit" error={errors.productName?.message}>
            <select
              {...addStockForm.register('productId')}
              className="w-full rounded-xl border border-[#eee8e2] bg-white px-3 py-3 text-sm"
            >
              <option value="">Sélèctionne un produit</option>
              {dataProductQuery.map((prod) => (
                <option key={prod.id} value={prod.id}>
                  {prod.name}
                </option>
              ))}
            </select>
          </FormField>
          <FormField
            label="Quantité à ajouter"
            error={errors.quantity?.message}
          >
            <input
              {...addStockForm.register('quantity', { valueAsNumber: true })}
              min="1"
              type="number"
              placeholder="Ex. 10"
              className="w-full rounded-xl border border-[#eee8e2] px-3 py-3 text-sm"
            />
          </FormField>
          <FormField
            label={typeMouvement === 'Ajout' ? 'Description' : 'justificatif'}
            error={errors.description?.message}
          >
            <textarea
              {...addStockForm.register('description')}
              rows={3}
              placeholder="Ex. Réception de la commande fournisseur..."
              className="w-full resize-y rounded-xl border border-[#eee8e2] px-3 py-3 text-sm"
            />
          </FormField>
          <button
            disabled={addStockMutation.isPending}
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#302724] px-4 py-3 text-sm font-medium text-white"
          >
            <Loader
              isloading={addStockMutation.isPending}
              title={
                <>
                  <Package size={17} />
                  Enregistrer le mouvement
                </>
              }
            />
          </button>
        </form>
      </section>
      <section className="rounded-2xl border border-[#eee8e2] bg-white p-5">
        <h2 className="font-semibold text-[#302724]">Aperçu de suppression</h2>
        <p className="mt-2 text-sm text-[#71655e]">
          Exemple de confirmation avant de supprimer un mouvement.
        </p>
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#eee8e2] px-4 py-2.5 text-sm text-[#ad625a]"
        >
          <Trash2 size={16} />
          Supprimer un mouvement
        </button>
      </section>
    </div>
  )
}

function SummaryCard({
  label,
  value,
  alert = false,
}: {
  label: string
  value: string
  alert?: boolean
}) {
  return (
    <article className="rounded-2xl border border-[#eee8e2] bg-white p-5">
      <p className="text-sm text-[#8d817a]">{label}</p>
      <p
        className={`mt-2 text-2xl font-semibold ${
          alert ? 'text-[#b05d54]' : 'text-[#302724]'
        }`}
      >
        {value}
      </p>
    </article>
  )
}

function MovementRow({ stockItem }: { stockItem: stockMouvementType }) {
  const isAddition = stockItem.type === 'Ajout'
  const MovementIcon = isAddition ? ArrowDownToLine : ArrowUpFromLine
  return (
    <article className="flex items-center justify-between gap-3 border-b border-[#f3efeb] p-4 last:border-0 sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${
            isAddition
              ? 'bg-[#edf4eb] text-[#5b7655]'
              : 'bg-[#fbefed] text-[#ad625a]'
          }`}
        >
          <MovementIcon size={17} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[#302724]">
            {stockItem.productName}
          </p>
          <p className="mt-1 text-xs text-[#8d817a]">
            {stockItem.sku ?? 'reference'} · {stockItem.type} ·{' '}
            {formatDate(stockItem.created_at)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span
          className={`whitespace-nowrap text-sm font-semibold ${stockItem.type === 'Ajout' ? 'text-[#5b7655] ' : 'text-[#ad625a]'} `}
        >
          {stockItem.type === 'Ajout' ? '+' : '-'}
          {stockItem.quantity}
        </span>
        <span>
          <Trash2 size={14} />
        </span>
      </div>
    </article>
  )
}
