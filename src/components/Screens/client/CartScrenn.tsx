import TrashIcon from '#/components/icons/TrashIcon'
import TitleBar from '#/components/TitleBar'
import imageUlistration from '#/asset/product.png'
import { Link } from '@tanstack/react-router'
function CartScrenn() {
  return (
    <main>
      <ShoopListsCard />
      <div className="md:grid items-end justify-end">
        <CartTotals />
      </div>
    </main>
  )
}
export default CartScrenn

const ShoopListsCard = () => {
  return (
    <main>
      <TitleBar suject="your" complement="cart" bar="right" />
      <div className="w-full bg-[#D1D1D1] h-[1px] mt-[13px] " />
      <div className="border-b border-[#D1D1D1] py-[25px] ">
        <div className="flex gap-x-[23px] ">
          <img src={imageUlistration} alt="" width={'114px'} height={'131px'} />
          <div className="w-full">
            <p className="md:text-[22px] font-medium mb-[17px] ">
              Sérum éclat à la vitamine C
            </p>
            <div className="md:flex justify-between items-center ">
              <div className="flex items-center gap-x-[29px] ">
                <div className="badge badge-outline badge-primary md:hidden mb-1">
                  30 ml
                </div>
                <p className="md:text-[24px] font-light">12 500 FCFA</p>
                <button className=" hidden md:block h-[50px] w-[100px] border border-[#DFDFDF] ">
                  30 ml
                </button>
              </div>

              <input
                type="number"
                className="w-[140px] md:h-[50px] h-[40px]  border border-[#DFDFDF] outline-none px-3 "
              />

              <div className="hidden md:block">
                <TrashIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

const CartTotals = () => {
  return (
    <div className="mt-[47px]">
      <TitleBar suject="cart" complement="totals" bar="right" />
      <div className="flex flex-col mt-[10px]">
        <div className="py-2 border-b border-[#E5E5E5] md:w-[645px] flex items-center justify-between">
          <p className="md:text-[16px] font-medium ">Subtotal</p>
          <p className="md:text-[16px] font-medium ">12 500 FCFA</p>
        </div>
        <div className="py-2 border-b border-[#E5E5E5] md:w-[645px] flex items-center justify-between">
          <p className="md:text-[16px] font-medium ">Livraison</p>
          <p className="md:text-[16px] font-medium ">1 500 FCFA</p>
        </div>
        <div className="py-2 md:w-[645px] flex items-center justify-between">
          <p className="md:text-[16px] font-medium ">Total</p>
          <p className="md:text-[16px] font-medium ">14 000 FCFA</p>
        </div>
      </div>
      <div className="text-center md:text-end mt-[48px] ">
        <Link to="/delivery">
          <button
            type="button"
            className="w-[262px] h-[58px] text-white bg-black"
          >
            Passer à la commande
          </button>
        </Link>
      </div>
    </div>
  )
}
