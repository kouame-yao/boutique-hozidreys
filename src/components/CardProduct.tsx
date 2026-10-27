import productImage from '#/asset/product.png'
import { Link } from '@tanstack/react-router'
export default function CardProduct({
  data,
  view,
}: {
  data: any[]
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
        {data.map((p) => (
          <div>
            <Link
              to="/product/$producttId"
              params={{ producttId: '1' }}
              className="block"
            >
              <img
                src={productImage}
                alt="Sérum éclat à la vitamine C"
                title="Sérum éclat à la vitamine C"
              />
            </Link>
            <div>
              <p className="font-medium text-xs md:text-[14px] h-full mt-[21px] mb-[6px] ">
                Sérum éclat à la vitamine C
              </p>
              <p className="md:text-[16px] text-xs font-medium h-full ">
                12 500 FCFA
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
