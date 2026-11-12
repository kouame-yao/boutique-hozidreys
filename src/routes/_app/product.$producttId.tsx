import CardProduct from '#/components/CardProduct'
import TitleBar from '#/components/TitleBar'
import { useAllProd } from '#/hook/admin-query-hook/product'
import type { productType } from '#/schema'
import { allProductFn } from '#/servers/admin/product-server'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { StarIcon } from 'lucide-react'
export const Route = createFileRoute('/_app/product/$producttId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const data = await allProductFn()
    const existe = data.some((prod) => prod.id === params.producttId)
    if (!existe) {
      throw redirect({ to: '/' })
    }
    const product = data.find((prod) => prod.id === params.producttId)
    return product
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()
  const allproduct = useAllProd()
  const productData =
    allproduct.data?.filter((prod) => prod.id !== data?.id) ?? []
  return (
    <main>
      <div className="md:flex grid md:gap-x-[51px] mb-[157px] ">
        <ViewProductImage images={data?.images ?? []} />
        <DetailProduct productDetail={data} />
      </div>

      {/* <DescriptionAvis /> */}
      {productData.length !== 0 && <RelateProduct product={productData} />}
    </main>
  )
}

const ViewProductImage = ({ images }: { images: string[] }) => {
  return (
    <div className="mb-6 w-full md:mb-0 md:w-[591px]">
      <section className="flex w-full flex-col gap-3 md:h-[681px] md:flex-row md:gap-x-[17px]">
        <div className="order-2 grid grid-cols-4 gap-3 md:order-1 md:flex md:flex-col md:gap-[12px]">
          {images.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              className="aspect-[138/159] w-full object-cover md:h-[159px] md:w-[138px]"
            />
          ))}
        </div>
        <div className="order-1 min-w-0 md:order-2 md:flex-1">
          <img src={images[0]} alt="" className="h-100 w-80 object-cover" />
        </div>
      </section>
    </div>
  )
}

const DetailProduct = ({
  productDetail,
}: {
  productDetail: productType | undefined
}) => {
  return (
    <div>
      <div className="flex flex-col">
        <h2 className="md:text-[34px] font-medium mb-[13px] ">
          {productDetail?.name}
        </h2>
        <div className="flex items-center mb-[27px]">
          {[1, 2, 3, 4].map((s) => (
            <StarIcon key={s} />
          ))}
          <span className="md:text-[16px] ">(122)</span>
        </div>
        <p className="md:text-[32px] font-medium mb-[27px]">
          {productDetail?.price} FCFA
        </p>
        <p className="md:text-[16px] mb-[43px] w-full">
          {productDetail?.description === ''
            ? 'Aucune description pour ce produit'
            : productDetail?.description}
        </p>
        <button className="bg-black md:w-[204px] h-[59px] text-white font-semibold mb-[38px] ">
          AJOUTER AU PANIER
        </button>
        <div className="w-full max-w-[500px] h-[1px] bg-[#ADADAD] mb-[19px] " />
        <div>
          <p>
            {productDetail?.ingredients === ''
              ? 'Aucun ingredient mentienner pour ce produit'
              : productDetail?.ingredients}
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
const RelateProduct = ({ product }: { product: productType[] }) => {
  return (
    <main className="grid justify-center items-center place-items-center mt-[175px] ">
      <TitleBar suject="À découvrir" complement="aussi" bar="right" />
      <div className="mt-[27px] ">
        <CardProduct view="col-5" data={product} />
      </div>
    </main>
  )
}
