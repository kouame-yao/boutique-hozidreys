import CollectionScreen from '#/components/Screens/client/CollectionScrenn'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/collection')({
  component: CollectionScreen,
})
