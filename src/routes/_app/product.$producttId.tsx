import { createFileRoute } from '@tanstack/react-router'
import imageUlistration from '#/asset/Rectangle 3634.png'
import { StarIcon } from 'lucide-react'
import TitleBar from '#/components/TitleBar'
import CardProduct from '#/components/CardProduct'
export const Route = createFileRoute('/_app/product/$producttId')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <div className="md:flex grid md:gap-x-[51px] mb-[157px] ">
        <ViewProductImage />
        <DetailProduct />
      </div>

      <DescriptionAvis />
      <RelateProduct />
    </main>
  )
}

const ViewProductImage = () => {
  return (
    <div className="mb-6 w-full md:mb-0 md:w-[591px]">
      <section className="flex w-full flex-col gap-3 md:h-[681px] md:flex-row md:gap-x-[17px]">
        <div className="order-2 grid grid-cols-4 gap-3 md:order-1 md:flex md:flex-col md:gap-[12px]">
          {[1, 2, 3, 4].map((p) => (
            <img
              key={p}
              src={imageUlistration}
              alt=""
              className="aspect-[138/159] w-full object-cover md:h-[159px] md:w-[138px]"
            />
          ))}
        </div>
        <div className="order-1 min-w-0 md:order-2 md:flex-1">
          <img src={imageUlistration} alt="" className="h-auto w-full" />
        </div>
      </section>
    </div>
  )
}

const DetailProduct = () => {
  return (
    <div>
      <div className="flex flex-col">
        <h2 className="md:text-[34px] font-medium mb-[13px] ">
          Sérum éclat à la vitamine C
        </h2>
        <div className="flex items-center mb-[27px]">
          {[1, 2, 3, 4].map((s) => (
            <StarIcon />
          ))}
          <span className="md:text-[16px] ">(122)</span>
        </div>
        <p className="md:text-[32px] font-medium mb-[27px]">12 500 FCFA</p>
        <p className="md:text-[16px] mb-[43px] w-full">
          Un sérum léger à la vitamine C, conçu pour compléter votre routine et
          apporter une touche d'éclat à votre peau. Flacon de 30 ml.
        </p>
        <button className="bg-black md:w-[204px] h-[59px] text-white font-semibold mb-[38px] ">
          AJOUTER AU PANIER
        </button>
        <div className="w-full max-w-[500px] h-[1px] bg-[#ADADAD] mb-[19px] " />
        <div>
          <p>
            Produit soigneusement sélectionné. <br />
            Paiement à la livraison disponible. <br />
            Pour toute question, contactez notre service client.
          </p>
        </div>
      </div>
    </div>
  )
}

const DescriptionAvis = () => {
  return (
    <div>
      <div>
        <button className="w-1/2 md:w-[171px] h-[70px] border border-[#D0D0D0] md:text-[16px] text-[#393939] ">
          Description
        </button>
        <button className="w-1/2 md:w-[171px] h-[70px] border border-[#D0D0D0] md:text-[16px] text-[#898989] ">
          Reviews (122)
        </button>
      </div>
      <div className="md:w-[900px] md:text-[16px] text-[#555555]  p-4 border border-[#898989] justify-center  ">
        Ce sérum à la vitamine C s'intègre facilement à votre routine de soins.
        Appliquez quelques gouttes sur une peau propre, puis poursuivez avec
        votre soin hydratant habituel. Consultez la liste des ingrédients sur
        l'emballage et adaptez l'utilisation à votre peau. En cas de doute,
        demandez conseil à un professionnel de santé.
      </div>
    </div>
  )
}
const RelateProduct = () => {
  return (
    <main className="grid justify-center items-center place-items-center mt-[175px] ">
      <TitleBar suject="À découvrir" complement="aussi" bar="right" />
      <div className="mt-[27px] ">
        <CardProduct view="col-5" data={[1, 2, 4, 6, 5]} />
      </div>
    </main>
  )
}
