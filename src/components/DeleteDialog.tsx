import { AlertTriangle, Trash2 } from 'lucide-react'

interface DeleteDialogProps {
  isOpen: boolean
  title?: string
  description?: string
  warningMessage?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: (value: boolean) => void
  loading?: boolean
}

export default function DeleteDialog({
  isOpen,
  title = 'Confirmer la suppression',
  description = 'Êtes-vous sûr de vouloir supprimer cet élément ?',
  warningMessage = 'Cette action est irréversible. Les données associées pourraient également être supprimées.',
  confirmText = 'Supprimer définitivement',
  cancelText = 'Annuler',
  onConfirm,
  onCancel,
  loading = false,
}: DeleteDialogProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-5 flex items-center gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="size-6 text-red-600" />
          </div>

          <div>
            <h2 id="delete-title" className="text-lg font-bold text-gray-900">
              {title}
            </h2>
            <p className="text-sm text-gray-500">Confirmation requise</p>
          </div>
        </div>

        {/* Description */}
        <p className="mb-5 text-sm leading-6 text-gray-600">{description}</p>

        {/* Item details */}

        {/* Warning */}
        <div className="mb-6 flex gap-2 rounded-lg bg-red-50 p-3">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-red-500" />

          <p className="text-xs leading-5 text-red-700">{warningMessage}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => onCancel(false)}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 className="size-4" />
            {loading ? 'Suppression...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
