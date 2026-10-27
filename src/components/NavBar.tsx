import logo from '#/asset/hozidreys-cosmetique.svg'
import { useEffect, useState } from 'react'
import SearchIcon from './icons/SearchIcon'
import ProfilIcon from './icons/ProfilIcon'
import ShoopingIcon from './icons/ShoopingIcon'
import MenuIcon from './icons/MenuIcon'
import { Link, useNavigate } from '@tanstack/react-router'
import { UserCheck2Icon } from 'lucide-react'

export default function NavBar({
  setOpenMenuMobil,
}: {
  setOpenMenuMobil: (value: boolean) => void
}) {
  const navigate = useNavigate()
  const [showOpen, setShowOpen] = useState(false)
  let authenticated = true
  useEffect(() => {
    const closeModalProfil = (event: MouseEvent) => {
      if (!showOpen) return
      const div = document.getElementById('modal-profil') as HTMLDivElement
      if (div && !div.contains(event.target as Node)) {
        setShowOpen(false)
      }
    }
    document.addEventListener('click', closeModalProfil)
    return () => {
      document.removeEventListener('click', closeModalProfil)
    }
  }, [showOpen])
  const isMobile = () => window.matchMedia('(max-width:767px)').matches

  return (
    <nav className="mb-[60px] ">
      <section className="flex items-center justify-between mb-4">
        <img src={logo} alt="Hozidreys Cosmétique" width={180} height={50} />
        <div className="md:flex items-center gap-x-[22px]  hidden ">
          <Link to="/" activeProps={{ className: 'underline' }}>
            ACCUEIL
          </Link>
          <Link to="/collection" activeProps={{ className: 'underline' }}>
            BOUTIQUE
          </Link>
          <Link to="/about" activeProps={{ className: 'underline' }}>
            À PROPOS
          </Link>
          <Link to="/contact" activeProps={{ className: 'underline' }}>
            CONTACT
          </Link>
        </div>
        <div className="flex items-center gap-8  ">
          <div className="flex items-center gap-4">
            <button className="cursor-pointer" type="button">
              <SearchIcon />
            </button>
            <button
              className="cursor-pointer"
              onClick={() => {
                if (!isMobile()) setShowOpen(!showOpen)
                if (!authenticated && isMobile()) {
                  navigate({ to: '/login' })
                }
                if (authenticated && isMobile()) {
                  navigate({ to: '/profil' })
                }
              }}
              type="button"
            >
              {authenticated ? (
                <UserCheck2Icon strokeWidth={'1.5px'} />
              ) : (
                <ProfilIcon />
              )}
            </button>

            <div className="relative">
              <Link to="/cart">
                <ShoopingIcon />
              </Link>
              {authenticated && (
                <div className="w-4 h-4 bg-black rounded-full absolute -bottom-2 -right-2 text-white flex justify-center items-center md:text-[13px] ">
                  2
                </div>
              )}
            </div>
          </div>
          <div onClick={() => setOpenMenuMobil(true)} className="md:hidden">
            <MenuIcon />
          </div>
        </div>
      </section>
      <div className="border-t border-[#ADADAD] relative "></div>

      {showOpen && (
        <div
          id="modal-profil"
          onClick={() => {
            const timeOut = setTimeout(() => {
              setShowOpen(false)
            }, 200)
            return () => clearTimeout(timeOut)
          }}
          className="absolute  right-41 w-[218px] grid items-center bg-[#F8F8F8] shadow-md "
        >
          <div className="grid justify-start items-start place-items-start w-full">
            <Link
              to={authenticated ? '/profil' : '/login'}
              className="p-2 w-[218px] "
            >
              {authenticated ? 'Mon profil' : 'Connexion'}
            </Link>
            {authenticated && (
              <div className="grid ">
                <Link to="/orders" className="p-2 cursor-pointer w-[218px] ">
                  Mes commandes
                </Link>
                <button className="p-2 cursor-pointer w-[218px] text-start">
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
