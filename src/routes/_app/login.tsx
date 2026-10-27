import SubscriptionNow from '#/components/SubscriptionNow'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/_app/login')({
  component: LoginScreen,
})

function LoginScreen() {
  const [toggle, setToggle] = useState(false)
  return (
    <div>
      {!toggle && <SignIn setToggle={setToggle} />}
      {toggle && <SignUp setToggle={setToggle} />}
      <SubscriptionNow />
    </div>
  )
}

const SignIn = ({ setToggle }: { setToggle: (value: boolean) => void }) => {
  return (
    <main className="grid justify-center items-center place-items-center mb-[528px] mt-[189px] ">
      <div className="text-center place-items-center">
        <div className="flex items-center gap-x-2 mb-[40px] ">
          <div className="prata text-[40px] ">Connexion</div>
          <div className="h-[2px] w-6 bg-gray-400 " />
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-y-[24px] ">
          <input
            type="text"
            className="md:w-[517px] h-[54px] w-full border px-3 "
            placeholder="Adresse e-mail"
          />
          <input
            type="text"
            className="md:w-[517px] h-[54px] w-full border px-3 "
            placeholder="Mot de passe"
          />
        </div>
        <div className="mt-[24px] flex justify-between">
          <span className="md:text-[16px] ">Mot de passe oublié ?</span>
          <span
            onClick={() => setToggle(true)}
            className="md:text-[16px] cursor-pointer underline "
          >
            Créer un compte
          </span>
        </div>
      </div>

      <button className="w-[151px] h-[53px] text-white  bg-black mt-[44px] ">
        Se connecter
      </button>
    </main>
  )
}

const SignUp = ({ setToggle }: { setToggle: (value: boolean) => void }) => {
  return (
    <main className="grid justify-center items-center place-items-center mb-[528px] mt-[189px] ">
      <div className="text-center place-items-center">
        <div className="flex items-center gap-x-2 mb-[40px] ">
          <div className="prata text-[40px] ">Créer un compte</div>
          <div className="h-[2px] w-6 bg-gray-400 " />
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-y-[24px] ">
          <input
            type="text"
            className="md:w-[517px] h-[54px] w-full border px-3 "
            placeholder="Nom complet"
          />
          <input
            type="text"
            className="md:w-[517px] h-[54px] w-full border px-3 "
            placeholder="Adresse e-mail"
          />
          <input
            type="text"
            className="md:w-[517px] h-[54px] w-full border px-3 "
            placeholder="Mot de passe"
          />
        </div>
        <div className="mt-[24px] flex justify-end">
          <span
            onClick={() => setToggle(false)}
            className="md:text-[16px] cursor-pointer underline "
          >
            Se connecter{' '}
          </span>
        </div>
      </div>

      <button className="w-[151px] h-[53px] text-white  bg-black mt-[44px] ">
        Créer mon compte
      </button>
    </main>
  )
}
