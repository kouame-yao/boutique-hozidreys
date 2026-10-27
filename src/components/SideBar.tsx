import type { AdminPage } from '#/hook/current-page-admin'
import { Link } from '@tanstack/react-router'
import {
  Bell,
  ChartNoAxesCombined,
  LayoutDashboard,
  Menu,
  Package,
  Plus,
  ShoppingCart,
  Sparkles,
  Tags,
  X,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'

const navigationItems: {
  id: AdminPage
  label: string
  icon: typeof LayoutDashboard
}[] = [
  { id: 'dashboard', label: 'Vue d’ensemble', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytique', icon: ChartNoAxesCombined },
  { id: 'orders', label: 'Commandes', icon: ShoppingCart },
  { id: 'products', label: 'Produits', icon: Package },
  { id: 'categories', label: 'Catégories', icon: Tags },
  { id: 'alerts', label: 'Alertes', icon: Bell },
]

export default function SideBar({
  children,
  pageLayout,
  setPageLayout,
  alertCount,
}: {
  children: ReactNode
  pageLayout: AdminPage
  setPageLayout: (value: AdminPage) => void
  alertCount: number
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  function navigateTo(page: AdminPage) {
    setPageLayout(page)
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#302724]">
      {mobileMenuOpen && (
        <button
          aria-label="Fermer le menu"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-[#302724]/35 md:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-[#eee8e2] bg-white px-4 py-5 transition-transform md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#f7f0eb] text-[#a87968]">
              <Sparkles size={20} />
            </span>
            <div>
              <p className="font-semibold tracking-wide text-[#302724]">
                HOZIDREYS
              </p>
              <p className="text-[10px] tracking-[0.23em] text-[#a87968]">
                COSMÉTIQUE
              </p>
            </div>
          </div>
          <button
            aria-label="Fermer le menu"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg p-2 text-[#8d817a] hover:bg-[#faf8f6] md:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mb-3 mt-10 px-3 text-[10px] font-semibold tracking-[0.16em] text-[#a99c94]">
          MENU PRINCIPAL
        </p>
        <nav className="space-y-1">
          {navigationItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => navigateTo(id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                pageLayout === id
                  ? 'bg-[#f7f0eb] font-medium text-[#8d6251]'
                  : 'text-[#71655e] hover:bg-[#faf8f6]'
              }`}
            >
              <Icon size={18} strokeWidth={1.8} />
              {label}
              {id === 'alerts' && alertCount > 0 && (
                <span className="ml-auto flex min-w-5 items-center justify-center rounded-full bg-[#b05d54] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  {alertCount}
                </span>
              )}
            </button>
          ))}
          <button
            onClick={() => navigateTo('new-product')}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
              pageLayout === 'new-product'
                ? 'bg-[#f7f0eb] font-medium text-[#8d6251]'
                : 'text-[#71655e] hover:bg-[#faf8f6]'
            }`}
          >
            <Plus size={18} strokeWidth={1.8} />
            Ajouter un produit
          </button>
        </nav>

        <div className="mt-auto rounded-2xl bg-[#f7f0eb] p-4">
          <p className="text-sm font-medium text-[#51413a]">
            Besoin d’un coup de main ?
          </p>
          <p className="mt-1 text-xs leading-5 text-[#8d817a]">
            Votre espace de gestion est en mode démonstration.
          </p>
        </div>
      </aside>

      <main className="min-h-screen md:ml-64">
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-[#eee8e2] bg-white/95 px-4 backdrop-blur sm:px-7">
          <div className="flex items-center gap-3">
            <button
              aria-label="Ouvrir le menu"
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-xl border border-[#eee8e2] p-2 text-[#625650] md:hidden"
            >
              <Menu size={19} />
            </button>
            <div>
              <p className="text-sm font-semibold text-[#302724]">
                Espace administration
              </p>
              <p className="hidden text-xs text-[#8d817a] sm:block">
                Hozidreys Cosmétique · Démonstration frontend
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              aria-label={`${alertCount} alerte(s) active(s)`}
              onClick={() => setPageLayout('alerts')}
              className="relative rounded-xl border border-[#eee8e2] p-2 text-[#71655e] hover:bg-[#faf8f6]"
            >
              <Bell size={18} />
              {alertCount > 0 && (
                <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-[#b05d54] text-[9px] font-semibold text-white">
                  {alertCount}
                </span>
              )}
            </button>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-[#302724]">Awa Diop</p>
              <p className="text-xs text-[#8d817a]">Administratrice</p>
            </div>
            <span className="flex size-10 items-center justify-center rounded-full bg-[#eadbd2] text-sm font-semibold text-[#805e50]">
              AD
            </span>
            <Link
              to="/"
              className="hidden rounded-xl border border-[#eee8e2] px-3 py-2 text-xs font-medium text-[#625650] hover:bg-[#faf8f6] sm:inline-flex"
            >
              Voir la boutique
            </Link>
          </div>
        </header>
        <div className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
