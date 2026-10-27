import AboutScrenn from '#/components/Screens/client/AboutScrenn'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/about')({
  component: AboutScrenn,
})
