import SideBar from '#/components/SideBar'
import { useCurrentPageAdmin } from '#/hook/current-page-admin'
import { createFileRoute } from '@tanstack/react-router'

type ProductSearch = {
  admin: string
}
export const Route = createFileRoute('/_admin/pannel')({
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    return {
      admin: search.admin as string,
    }
  },
  component: Pannel,
})

function Pannel() {
  const { Page, setPageLayout, pageLayout, alertCount } = useCurrentPageAdmin()

  return (
    <SideBar
      pageLayout={pageLayout}
      setPageLayout={setPageLayout}
      alertCount={alertCount}
    >
      <Page />
    </SideBar>
  )
}
