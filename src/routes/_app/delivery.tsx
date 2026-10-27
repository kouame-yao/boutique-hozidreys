import DeliveryScreen from '#/components/Screens/client/DeliveryScrenn'
import TitleBar from '#/components/TitleBar'
import { Link } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/delivery')({
  component: DeliveryScreen,
})
