import contactImage from '#/asset/contact_img.png'
import SubscriptionNow from '#/components/SubscriptionNow'
import TitleBar from '#/components/TitleBar'
function ContactScrenn() {
  return (
    <div>
      <ContactUs />
      <SubscriptionNow />
    </div>
  )
}
export default ContactScrenn
const ContactUs = () => {
  return (
    <main className="mb-[264px] ">
      <div className="flex justify-center items-center mb-[46px] ">
        <TitleBar suject="contactez" complement="HOZI" bar="right" />
      </div>
      <div className="md:flex grid md:gap-x-[46px] gap-y-[46px]  ">
        <img
          src={contactImage}
          alt="contact"
          width={'598px'}
          height={'598px'}
        />
        <div className="grid justify-center items-center">
          <div>
            <p className="md:text-[24px] font-semibold mb-[24px]">
              Notre service client
            </p>
            <p className="md:text-[18px] text-[#6D6D6D] mb-[21px] ">
              Une question sur un produit ou une commande ?<br />
              Notre équipe est là pour vous aider.
            </p>
            <p className="md:text-[18px] text-[#6D6D6D] mb-[21px] ">
              Du lundi au vendredi, de 9 h à 17 h
              <br /> E-mail : bonjour@hozi-beaute.fr
            </p>

            <p className="md:text-[24px] font-semibold mb-[24px]">
              Nos conseils beauté
            </p>

            <span className="md:text-[18px] text-[#6D6D6D] ">
              Écrivez-nous pour obtenir des informations sur nos produits et
              votre routine de soins.
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
