import type { ReactNode } from 'react'
import type { AdminOrder } from './adminData'

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-[#a87968]">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-semibold text-[#302724] sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-[#8d817a]">{description}</p>
      </div>
      {action}
    </div>
  )
}

export function StatusBadge({ status }: { status: AdminOrder['status'] }) {
  const styles: Record<AdminOrder['status'], string> = {
    Nouvelle: 'bg-[#f3eefe] text-[#8162a5]',
    Livrée: 'bg-[#edf4eb] text-[#5b7655]',
    'En préparation': 'bg-[#fbf2df] text-[#9a7436]',
    'En livraison': 'bg-[#edf1f8] text-[#637998]',
    Annulée: 'bg-[#fbefed] text-[#ad625a]',
  }

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  )
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-[#e7ddd5] px-5 py-10 text-center text-sm text-[#8d817a]">
      {children}
    </div>
  )
}
