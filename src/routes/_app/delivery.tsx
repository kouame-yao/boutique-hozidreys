import DeliveryScreen from '#/components/Screens/client/DeliveryScrenn'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/delivery')({
  component: DeliveryScreen,
})
