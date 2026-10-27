import TitleBar from '#/components/TitleBar'
import { Link } from '@tanstack/react-router'

function DeliveryScreen() {
  return (
    <main className="md:flex gap-[100px] ">
      <DeliveryInfo />
      <CartTotals />
    </main>
  )
}
export default DeliveryScreen

const DeliveryInfo = () => {
  return (
    <main className="md:max-w-[575px] ">
      <div>
        <TitleBar suject="delivery" complement="information" bar="right" />

        <form>
          <div className="grid md:grid-cols-2 md:gap-x-[15px] gap-y-[15px]  mb-[29px] mt-[50px]">
            <input
              placeholder="Prénom"
              type="text "
              className="focus:px-3 md:h-[50x] h-[51px] border border-[#C5C5C5] outline-none placeholder:px-3 "
            />
            <input
              placeholder="Nom"
              type="text "
              className="focus:px-3 md:h-[50x] h-[51px] border border-[#C5C5C5] outline-none placeholder:px-3  "
            />
          </div>
          <div className="flex flex-col gap-y-[32px] mb-[29px] ">
            <input
              placeholder="Adresse e-mail"
              type="text"
              className="focus:px-3 md:h-[50x] h-[51px] border border-[#C5C5C5] outline-none placeholder:px-3  "
            />
            <input
              placeholder="Adresse"
              type="text"
              className="focus:px-3 md:h-[50x] h-[51px] border border-[#C5C5C5] outline-none placeholder:px-3  "
            />
          </div>

          <div className="grid md:grid-cols-2 gap-x-[15px] gap-y-[29px] mb-[29px]">
            <input
              placeholder="Ville"
              type="text"
              className="focus:px-3 md:h-[50x] h-[51px] border border-[#C5C5C5] outline-none placeholder:px-3  "
            />
            <input
              placeholder="Région"
              type="text"
              className="focus:px-3 md:h-[50x] h-[51px] border border-[#C5C5C5] outline-none placeholder:px-3  "
            />

            <input
              placeholder="Code postal"
              type="text"
              className="focus:px-3 md:h-[50px] h-[51px] border border-[#C5C5C5] outline-none placeholder:px-3  "
            />
            <input
              placeholder="Pays"
              type="text"
              className="focus:px-3 md:h-[50x] h-[51px] border border-[#C5C5C5] outline-none placeholder:px-3  "
            />
          </div>
          <input
            placeholder="Téléphone"
            type="text"
            className="focus:px-3 md:h-[50x] h-[51px] border border-[#C5C5C5] outline-none placeholder:px-3 w-full  "
          />
        </form>
      </div>
    </main>
  )
}

const CartTotals = () => {
  return (
    <div className="mt-[47px] md:min-w-[545px]  ">
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
        <div className="py-2  flex items-center justify-between">
          <p className="md:text-[16px] font-medium ">Total</p>
          <p className="md:text-[16px] font-medium ">14 000 FCFA</p>
        </div>
      </div>
      <div className="">
        <div className="flex gap-x-[16px]  ">
          <button className="md:w-[204px] h-[53px] w-full border border-[#E5E5E5] ">
            Wave
          </button>
          <button className="md:w-[204px] h-[53px] border w-full border-[#E5E5E5] ">
            Orange Money
          </button>
          <button className="md:w-[204px] h-[53px] border w-full border-[#E5E5E5] ">
            MTN MoMo
          </button>
        </div>
        <div className="text-center md:text-end mt-[48px] ">
          <Link to="/orders">
            <button
              type="button"
              className="w-[262px] h-[58px] text-white bg-black"
            >
              Confirmer la commande
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
