import imageUlistration from '#/asset/product.png'
import TitleBar from '#/components/TitleBar'
function OrdersScrenn() {
  return <ShoopListsCard />
}
export default OrdersScrenn
const ShoopListsCard = () => {
  return (
    <main>
      <TitleBar suject="my" complement="orders" bar="right" />
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
                <p className="md:text-[24px] font-light">12 500 FCFA</p>
                <p className="hidden md:block md:text-[20px]">Quantité : 1</p>
                <p className="md:text-[20px] md:hidden ">Quantité : 1</p>
                <button className=" hidden md:block h-[50px] w-[100px] border border-[#DFDFDF] ">
                  30 ml
                </button>
              </div>

              <div className="flex items-center gap-[10px] ">
                <span className="indicator-item status status-success"></span>
                <p>En préparation</p>
              </div>

              <div className="hidden md:block border border-[#BABABA] w-[178px] p-2 rounded-md text-center  ">
                Suivre ma commande
              </div>
            </div>
            <div>
              <p className=" md:text-[18px] ">
                Commandée le :{' '}
                <span className="text-[#989898]">25 mai 2024</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
