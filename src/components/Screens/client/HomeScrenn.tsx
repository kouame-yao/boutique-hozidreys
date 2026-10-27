import CardProduct from '#/components/CardProduct'
import ExchangeIcon from '#/components/icons/ExchangeIcon'
import QualityIcon from '#/components/icons/QualityIcon'
import SubscriptionNow from '#/components/SubscriptionNow'
import { SuperscriptIcon } from 'lucide-react'
import homeImageHeader from '#/asset/header_img.png'
import TitleBar from '#/components/TitleBar'
function HomeScrenn() {
  return (
    <div>
      <HeadesSections />
      <CollectionBody />
      <BestSellerBody />
      <DetailSupport />
      <div className="mt-[146px] ">
        <SubscriptionNow />
      </div>
    </div>
  )
}
export default HomeScrenn

const HeadesSections = () => {
  return (
    <main className="border-[1px] border-[#ADADAD] md:w-auto md:h-auto mb-[82px] md:flex">
      <section className="p-8 md:w-200  flex flex-col gap-4 md:justify-center md:items-center ">
        <div className=" flex items-center place-items-center gap-2">
          <div className="w-[40px] h-px bg-[#484848] " />
          <p className="text-sm font-medium uppercase md:text-[18px] ">
            notre sélection beauté
          </p>
        </div>
        <div className="prata text-2xl md:text-[60px] ">
          Révélez votre éclat
        </div>
        <div className=" flex items-center gap-2">
          <p className="text-sm font-medium uppercase md:text-[18px]">
            Découvrir la boutique
          </p>
          <div className="w-[40px] h-px bg-[#484848] " />
        </div>
      </section>
      <section>
        <img src={homeImageHeader} alt="header image" />
      </section>
    </main>
  )
}

const CollectionBody = () => {
  return (
    <main>
      <section className="grid text-center justify-center items-center place-items-center mb-[44px] ">
        <TitleBar suject="Nos" complement="nouveautés" bar="right" />
        <p className="text-[16px] text-[#868686] ">
          Des essentiels beauté soigneusement sélectionnés pour votre routine.
        </p>
      </section>
      {/* carde section */}
      <section className="px-[30px] ">
        <CardProduct view="col-5" data={[1, 2, 3, 4, 5, 6]} />
      </section>
    </main>
  )
}

const BestSellerBody = () => {
  return (
    <main className="mt-[143px] ">
      <section className="grid text-center justify-center items-center place-items-center mb-[44px] ">
        <TitleBar suject="Les" complement="incontournables" bar="right" />
        <p className="text-[16px] text-[#868686] ">
          Découvrez les soins préférés de notre communauté.
        </p>
      </section>
      {/* carde section */}
      <section className="px-[30px]">
        <CardProduct view="col-4" data={[1, 2, 3, 4, 5]} />
      </section>
    </main>
  )
}

const DetailSupport = () => {
  return (
    <main className="grid gap-y-[98px] mt-[143px] md:flex items-center md:justify-center md:gap-x-[98px] ">
      <div className="flex flex-col justify-center text-center place-items-center space-y-2">
        <ExchangeIcon />
        <p className="font-semibold text-sm md:text-[18px] ">
          Une sélection de qualité
        </p>
        <p className="text-[#898989] text-sm md:text-[18px] ">
          Des produits choisis avec soin pour votre routine beauté
        </p>
      </div>
      <div className="flex flex-col justify-center text-center place-items-center space-y-2">
        <QualityIcon />
        <p className="font-semibold text-sm md:text-[18px] ">
          Livraison suivie
        </p>
        <p className="text-[#898989] text-sm md:text-[18px] ">
          Votre commande est préparée avec attention
        </p>
      </div>
      <div className="flex flex-col justify-center text-center place-items-center space-y-2">
        <SuperscriptIcon />
        <p className="font-semibold text-sm md:text-[18px] ">
          À votre écoute
        </p>
        <p className="text-[#898989] text-sm md:text-[18px] ">
          Notre équipe vous accompagne dans vos choix beauté
        </p>
      </div>
    </main>
  )
}
