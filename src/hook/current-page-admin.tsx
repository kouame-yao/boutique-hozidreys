import Alerts from '#/components/Screens/admin/Alerts'
import Analytics from '#/components/Screens/admin/Analytics'
import Categorie from '#/components/Screens/admin/Categorie'
import Dashboad from '#/components/Screens/admin/Dashboad'
import Inventory from '#/components/Screens/admin/Inventory'
import NewProduct from '#/components/Screens/admin/NewProduct'
import Orders from '#/components/Screens/admin/Orders'
import Product from '#/components/Screens/admin/Product'
import { useState } from 'react'

export type AdminPage =
  | 'dashboard'
  | 'analytics'
  | 'orders'
  | 'inventory'
  | 'alerts'
  | 'products'
  | 'categories'
  | 'new-product'

export function useCurrentPageAdmin() {
  const [pageLayout, setPageLayout] = useState<AdminPage>('dashboard')

  const Page = () => {
    switch (pageLayout) {
      case 'analytics':
        return <Analytics />
      case 'orders':
        return <Orders />
      case 'inventory':
        return <Inventory />
      case 'alerts':
        return <Alerts />
      case 'products':
        return <Product setPageLayout={setPageLayout} />
      case 'categories':
        return <Categorie />
      case 'new-product':
        return <NewProduct setPageLayout={setPageLayout} />
      case 'dashboard':
      default:
        return <Dashboad />
    }
  }

  return {
    Page,
    pageLayout,
    setPageLayout,
    alertCount: 3,
  }
}
