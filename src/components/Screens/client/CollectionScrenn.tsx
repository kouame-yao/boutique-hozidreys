import CardProduct from '#/components/CardProduct'
import DropdownIcon from '#/components/icons/DropdownIcon'
import TitleBar from '#/components/TitleBar'

function CollectionScreen() {
  return (
    <div className="grid md:flex mb-[371px] gap-x-[40px] ">
      <div className=" w-full md:w-[315px] mt-14">
        <Filster />
      </div>
      <AllCollections />
    </div>
  )
}

export default CollectionScreen

const AllCollections = () => {
  return (
    <div>
      <section className="grid md:grid-cols-2 mb-[18px] mt-[18px]">
        <TitleBar suject="All" complement="Collections" bar="right" />
        <div>
          <div
            onClick={() => {
              const select = document.getElementById(
                'select-collection',
              ) as HTMLSelectElement
              select.showPicker()
            }}
            className="border border-[#C8C8C8] p-2 flex items-center justify-between"
          >
            <select
              name=""
              id="select-collection"
              className="appearance-none outline-none w-full "
            >
              <option value="">Trier par : prix croissant</option>
            </select>
            <label
              onClick={() => {
                const select = document.getElementById(
                  'select-collection',
                ) as HTMLSelectElement
                select.showPicker()
              }}
              htmlFor="select-collection"
            >
              <DropdownIcon />
            </label>
          </div>
        </div>
      </section>
      <section>
        <CardProduct
          view="col-4"
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
        />
      </section>
    </div>
  )
}

const Filster = () => {
  return (
    <main className="grid gap-y-[23px] ">
      <section className="border border-[#C8C8C8] px-[23px] ">
        <h1 className="mt-[14px] ">TYPE DE PRODUIT</h1>
        <div className="grid gap-y-[13px] mt-[16px] mb-[24px] ">
          <div className="flex gap-[11px]  ">
            <input type="checkbox" className="w-4" />
            <span>Soins du visage</span>
          </div>
          <div className="flex gap-[11px] ">
            <input type="checkbox" className="w-4" />
            <span>Soins du corps</span>
          </div>
          <div className="flex gap-[11px] ">
            <input type="checkbox" className="w-4" />
            <span>Maquillage</span>
          </div>
        </div>
      </section>
      <section className="border border-[#C8C8C8] px-[23px] ">
        <h1 className="mt-[14px] ">TYPE DE PEAU</h1>
        <div className="grid gap-y-[13px] mt-[16px] mb-[24px] ">
          <div className="flex gap-[11px]  ">
            <input type="checkbox" className="w-4" />
            <span>Tous types de peau</span>
          </div>
          <div className="flex gap-[11px] ">
            <input type="checkbox" className="w-4" />
            <span>Peau sèche</span>
          </div>
          <div className="flex gap-[11px] ">
            <input type="checkbox" className="w-4" />
            <span>Peau sensible</span>
          </div>
        </div>
      </section>
    </main>
  )
}
