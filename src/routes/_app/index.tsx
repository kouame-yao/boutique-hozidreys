import HomeScrenn from '#/components/Screens/client/HomeScrenn'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/')({
  component: HomeScrenn,
})
