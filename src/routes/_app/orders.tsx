import OrdersScrenn from '#/components/Screens/client/OrdersScreen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/orders')({
  component: OrdersScrenn,
})
