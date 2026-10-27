import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/profil')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/profil"!</div>
}
