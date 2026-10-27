import Categorie from '#/components/Screens/admin/Categorie'
import Dashboad from '#/components/Screens/admin/Dashboad'
import Analytics from '#/components/Screens/admin/Analytics'
import Alerts, { buildAdminAlerts } from '#/components/Screens/admin/Alerts'
import NewProduct from '#/components/Screens/admin/NewProduct'
import Orders from '#/components/Screens/admin/Orders'
import Product from '#/components/Screens/admin/Product'
import type {
  AdminCategory,
  AdminOrder,
  AdminProduct,
} from '#/components/Screens/admin/adminData'
import {
  demoCategories,
  demoOrders,
  demoProducts,
} from '#/components/Screens/admin/adminData'
import { useState } from 'react'

export type AdminPage =
  | 'dashboard'
  | 'analytics'
  | 'orders'
  | 'alerts'
  | 'products'
  | 'categories'
  | 'new-product'

export function useCurrentPageAdmin() {
  const [pageLayout, setPageLayout] = useState<AdminPage>('dashboard')
  const [products, setProducts] = useState<AdminProduct[]>(demoProducts)
  const [categories, setCategories] = useState<AdminCategory[]>(demoCategories)
  const [orders, setOrders] = useState<AdminOrder[]>(demoOrders)
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([])
  const alerts = buildAdminAlerts(products, orders).filter(
    (alert) => !dismissedAlerts.includes(alert.id),
  )

  function addProduct(product: AdminProduct) {
    setProducts((currentProducts) => [product, ...currentProducts])
    setPageLayout('products')
  }

  function updateProduct(updatedProduct: AdminProduct) {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    )
  }

  function restockProduct(id: string, quantity: number) {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id
          ? { ...product, stock: product.stock + quantity }
          : product,
      ),
    )
  }

  function addCategory(name: string) {
    setCategories((currentCategories) => [
      ...currentCategories,
      {
        id: `CAT-${Date.now()}`,
        name,
        productCount: 0,
      },
    ])
  }

  function renameCategory(id: string, name: string) {
    const category = categories.find((entry) => entry.id === id)
    if (!category) return
    setCategories((currentCategories) =>
      currentCategories.map((entry) =>
        entry.id === id ? { ...entry, name } : entry,
      ),
    )
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.category === category.name
          ? { ...product, category: name }
          : product,
      ),
    )
  }

  function updateOrderStatus(id: string, status: AdminOrder['status']) {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === id && order.status !== 'Livrée'
          ? {
              ...order,
              status,
              trackingNumber:
                status === 'En livraison'
                  ? (order.trackingNumber ?? `HZ-TR-${id.replace(/\D/g, '')}`)
                  : order.trackingNumber,
            }
          : order,
      ),
    )
  }

  const Page = () => {
    switch (pageLayout) {
      case 'analytics':
        return <Analytics orders={orders} products={products} />
      case 'orders':
        return (
          <Orders
            orders={orders}
            products={products}
            onUpdateStatus={updateOrderStatus}
          />
        )
      case 'alerts':
        return (
          <Alerts
            alerts={alerts}
            onDismiss={(id) =>
              setDismissedAlerts((current) => [...current, id])
            }
            onDismissAll={() =>
              setDismissedAlerts((current) => [
                ...current,
                ...alerts.map((alert) => alert.id),
              ])
            }
            onNavigate={setPageLayout}
          />
        )
      case 'products':
        return (
          <Product
            products={products}
            categories={categories}
            onAddProduct={() => setPageLayout('new-product')}
            onUpdateProduct={updateProduct}
            onRestockProduct={restockProduct}
            onDeleteProduct={(id) =>
              setProducts((currentProducts) =>
                currentProducts.filter((product) => product.id !== id),
              )
            }
          />
        )
      case 'categories':
        return (
          <Categorie
            categories={categories}
            products={products}
            onAddCategory={addCategory}
            onRenameCategory={renameCategory}
            onDeleteCategory={(id) =>
              setCategories((currentCategories) =>
                currentCategories.filter((category) => category.id !== id),
              )
            }
          />
        )
      case 'new-product':
        return (
          <NewProduct
            categories={categories}
            onBack={() => setPageLayout('products')}
            onCreateProduct={addProduct}
          />
        )
      case 'dashboard':
      default:
        return <Dashboad orders={orders} products={products} />
    }
  }

  return {
    Page,
    pageLayout,
    setPageLayout,
    alertCount: alerts.length,
  }
}
