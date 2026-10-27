import CartScrenn from '#/components/Screens/client/CartScrenn'
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/_app/cart')({
  component: CartScrenn,
})
