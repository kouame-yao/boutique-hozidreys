import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/profil')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Link to="/pannel" search={{ admin: 'd,,d' }}>
        <button className="btn">Pannel admin</button>
      </Link>
    </div>
  )
}
