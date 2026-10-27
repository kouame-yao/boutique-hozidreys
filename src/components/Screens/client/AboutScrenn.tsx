import TitleBar from '#/components/TitleBar'
import imageUlustra from '#/asset/about_img.png'
import SubscriptionNow from '#/components/SubscriptionNow'
function AboutScrenn() {
  return (
    <div>
      <AboutUs />
      <ChooseUse />
      <div>
        <SubscriptionNow />
      </div>
    </div>
  )
}

export default AboutScrenn

const AboutUs = () => {
  return (
    <main className="mb-[89px] ">
      <div className="flex justify-center items-center mb-[50px] ">
        <TitleBar suject="about" complement="us" bar="right" />
      </div>
      <div className="md:flex grid md:gap-x-[119px] gap-y-[119px] ">
        <img
          className="object-cover  "
          src={imageUlustra}
          alt="Une routine de soins et de cosmétiques HOZI Beauté"
          width={'686px'}
          height={'697px'}
        />
        <div className="md:w-[714px] md:h-[664px]  grid justify-center items-center ">
          <p className="md:text-[18px] font-bold ">
            HOZI Beauté est née d'une envie simple : rendre les soins et les
            cosmétiques plus faciles à découvrir et à choisir. Nous réunissons
            des essentiels pour le visage, le corps et le maquillage afin de
            vous aider à composer une routine qui vous ressemble. Notre
            engagement est de vous proposer une expérience d'achat claire, une
            sélection attentive et un accompagnement à chaque étape, de la
            découverte de vos produits à leur réception.
          </p>
        </div>
      </div>
    </main>
  )
}

const ChooseUse = () => {
  return (
    <div className="mb-[89px]">
      <TitleBar suject="why" complement="choose us" bar="right" />
      <div className="md:w-auto md:h-[385px] h-full md:flex grid border justify-center items-center mt-[50px] ">
        <div className="md:h-full md:border-r md:grid justify-center items-center md:p-10">
          <div className="grid md:gap-y-[62px] px-4 gap-y-2 py-4 ">
            <h2 className="md:text-[18px] font-semibold">Une sélection attentive</h2>
            <p className="md:text-[18px]">
              Nous choisissons nos soins et cosmétiques avec attention pour vous
              proposer des essentiels adaptés à votre routine.
            </p>
          </div>
        </div>

        <div className="md:h-full md:border-r md:grid justify-center items-center md:p-10">
          <div className="grid md:gap-y-[62px] px-4 gap-y-2 border-t md:border-t-0 py-4 ">
            <h2 className="md:text-[18px] font-semibold">Des conseils à votre écoute</h2>
            <p className="md:text-[18px]">
              Notre équipe vous accompagne pour vous aider à trouver les
              produits qui vous conviennent.
            </p>
          </div>
        </div>

        <div className="md:h-full md:grid justify-center items-center md:p-10">
          <div className="grid md:gap-y-[62px] px-4 gap-y-2 border-t md:border-t-0 py-4 ">
            <h2 className="md:text-[18px] font-semibold">Une beauté au quotidien</h2>
            <p className="md:text-[18px]">
              Des soins et des gestes simples pour prendre soin de vous chaque
              jour.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
