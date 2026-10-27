import React from 'react'

export default function SubscriptionNow() {
  return (
    <div className="w-full ">
      <h1 className="font-medium text-2xl md:text-[28px] md:h-full text-center ">
        Inscrivez-vous et profitez de 10 % de réduction
      </h1>
      <p className="text-xs md:text-[16px]  text-[#9A9A9A] text-center mb-[46px] mt-[24px]">
        Recevez nos nouveautés, nos conseils beauté et des offres exclusives
        directement dans votre boîte mail.
      </p>
      <div className="w-full md:w-4xl mx-auto">
        <div className="border-[1px] border-[#C7C7C7]  flex items-center">
          <input
            type="text"
            placeholder="Votre adresse e-mail"
            className="px-3 placeholder:text-[#9A9A9A] w-full  outline-none "
          />
          <button className="text-white bg-black p-2 text-sm md:text-[16px] md:w-2xs ">
            M'INSCRIRE
          </button>
        </div>
      </div>
    </div>
  )
}
