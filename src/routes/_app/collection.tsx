import CollectionScreen from '#/components/Screens/client/CollectionScrenn'
import { allProductFn } from '#/servers/admin/product-server'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/collection')({
  loader: async () => await allProductFn(),
  component: () => {
    const data = Route.useLoaderData()

    return <CollectionScreen product={data} />
  },
})
