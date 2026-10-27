import SideBar from '#/components/SideBar'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_admin')({
  component: RouteComponent,
})

function RouteComponent() {
  const { admin } = Route.useSearch() as { admin: string }
  const navigate = useNavigate()
  let authenticated = true

  useEffect(() => {
    if (!authenticated) return
    if (!admin || admin === '') navigate({ to: '/' })
  }, [admin, navigate])
  if (!authenticated) {
    return <>chargement...</>
  }
  return (
    <div>
      <Outlet />
    </div>
  )
}
