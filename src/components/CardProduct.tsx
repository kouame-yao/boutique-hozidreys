import type { productType } from '#/schema'
import { Link } from '@tanstack/react-router'
import { Heart, Star } from 'lucide-react'
export default function CardProduct({
  data,
  view,
}: {
  data: productType[]
  view?: 'col-2' | 'col-3' | 'col-4' | 'col-5'
}) {
  let grid_view
  switch (view) {
    case 'col-2':
      grid_view = 'grid-cols-2'
      break
    case 'col-3':
      grid_view = 'grid-cols-3'
      break
    case 'col-4':
      grid_view = 'grid-cols-4'
      break
    case 'col-5':
      grid_view = 'grid-cols-5'
      break

    default:
      grid_view = 'grid-cols-1'
      break
  }

  return (
    <article>
      <div
        className={`grid grid-cols-2 md:${grid_view} sm:grid-cols-4 gap-[28px] `}
      >
        {data.map((prod, index) => (
          <div
            className="bg-gray-50 border border-gray-200 relative w-35 rounded-2xl"
            key={index}
          >
            <span className="absolute top-0 z-10 right-0 cursor-pointer active:scale-95 bg-white/30 rounded-full p-2">
              <Heart color="#ebebf4" size={30} />
            </span>
            <Link
              to="/product/$producttId"
              params={{ producttId: prod.id as string }}
              className=""
            >
              <div className="relative group">
                {/* <div className=" justify-center items-center mx-auto bg-black/30 rounded-2xl h-full w-full absolute z-20 ">
                  <div className="text-white text-xs font-medium prata">
                    Voir détails
                  </div>
                </div> */}
                <img
                  src={prod.images?.[0]}
                  alt={prod.name}
                  title={prod.name}
                  className="h-40 w-full object-cover rounded-2xl"
                />
                <div className=" badge-sm badge-outline badge-info absolute bottom-0 left-2 ">
                  disponible
                </div>
              </div>
            </Link>
            <div className="grid justify-center items-center mt-2 mb-2">
              <div className="space-y-1">
                <p className="font-medium text-xs md:text-[14px] text-center ">
                  {prod.name}
                </p>
                <div className="flex gap-x-1 items-center">
                  {[1, 2, 3, 4, 5].map((start) => (
                    <Star size={10} />
                  ))}
                  <p className="text-[10px] semi-bold">4.9 (3.5k)</p>
                </div>
              </div>
              <div className="space-y-1 mt-3">
                <p
                  className={`md:text-[16px] text-xs font-bold h-full text-center ${prod.promotionalPrice === 0 && 'line-through link-error'}`}
                >
                  {prod.price} FCFA
                </p>
                {prod.promotionalPrice === 0 && (
                  <p className="md:text-[16px] text-xs font-bold h-full text-center  ">
                    {prod.promotionalPrice} FCFA
                  </p>
                )}

                <button className="text-xs badge badge-neutral ">
                  Ajout au parnier
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
