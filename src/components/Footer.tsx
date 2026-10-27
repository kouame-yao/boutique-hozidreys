import logo from '#/asset/hozidreys-cosmetique.svg'
import { Link } from '@tanstack/react-router'
export default function Footer() {
  return (
    <footer className="mt-[156px] ">
      <div className="grid md:grid-cols-4 md:gap-x-[100px] ">
        <div className="grid md:col-span-2 items-center justify-center place-items-center md:items-start md:justify-items-start ">
          <img
            src={logo}
            alt="Hozidreys Cosmétique"
            width={140}
            className="mb-[36px] "
          />
          <div className="text-xs text-center md:text-left md:text-[18px] text-[#595959] mb-[39px]  ">
            HOZI Beauté célèbre votre peau avec une sélection de soins et de
            cosmétiques choisis pour accompagner simplement votre routine
            beauté, au quotidien.
          </div>
        </div>
        <div className="flex justify-center md:justify-start  md:flex-col md:items-start items-center gap-4 text-xs md:text-[18px] text-[#595959] mb-[16px]">
          <h2 className="hidden md:block  text-[22px] text-[#5A5A5A] ">
            LA BOUTIQUE
          </h2>
          <Link to="/">Accueil</Link>
          <Link to="/about">À propos</Link>
          <Link to="/delivery">Livraison</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="flex justify-center md:justify-start  md:flex-col md:items-start items-center gap-4 text-xs md:text-[18px] text-[#595959] mb-[16px]">
          <h2 className="hidden md:block text-[22px] text-[#5A5A5A] ">
            BESOIN D'AIDE ?
          </h2>
          <span>Du lundi au vendredi, de 9 h à 17 h</span>
          <span>bonjour@hozi-beaute.fr</span>
        </div>
      </div>
    </footer>
  )
}
