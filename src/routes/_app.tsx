import Footer from '#/components/Footer'
import NavBar from '#/components/NavBar'
import { Link, Outlet } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
})

function RouteComponent() {
  const [openMenuMobile, setMenuMobile] = useState(false)
  return (
    <main className="relative">
      {openMenuMobile && <MenuMobile setOpenMenuMobil={setMenuMobile} />}
      <section className="inline-block m-6 md:mx-[167px] md:my-[29px] ">
        <NavBar setOpenMenuMobil={setMenuMobile} />
        <Outlet />
        <Footer />
      </section>
      <div className="text-xs flex text-center justify-center border-t border-gray-400 p-4">
        <p>© HOZI Beauté — Tous droits réservés.</p>
      </div>
    </main>
  )
}

const MenuMobile = ({
  setOpenMenuMobil,
}: {
  setOpenMenuMobil: (value: boolean) => void
}) => {
  return (
    <div className="block md:hidden bg-white h-screen fixed w-screen z-10">
      <Link
        onClick={() => setOpenMenuMobil(false)}
        className="block p-4 border-b"
        to="/"
      >
        ACCUEIL
      </Link>

      <Link
        onClick={() => setOpenMenuMobil(false)}
        className="block p-4 border-b"
        to="/collection"
      >
        BOUTIQUE
      </Link>

      <Link
        onClick={() => setOpenMenuMobil(false)}
        className="block p-4 border-b"
        to="/about"
      >
        À PROPOS
      </Link>

      <Link
        onClick={() => setOpenMenuMobil(false)}
        className="block p-4 border-b"
        to="/contact"
      >
        CONTACT
      </Link>
    </div>
  )
}
