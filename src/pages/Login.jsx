import React from 'react'
import LoginPicture from '../assets/login.png'
import { Icon } from '@iconify/react/dist/iconify.js'
import Button from '../components/Button'

function Login() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
       <div className="flex items-center justify-center md:gap-x-40">
        <form action="" className="flex flex-col gap-4">
          <p className="text-5xl mb-10 text-black31">Se connecter</p>
          <div className="flex lg:w-96 py-2 rounded-md items-center px-2 border border-gray-400">
            <Icon
              icon="mdi:email-outline"
              className="w-6 h-6 mr-2"
              color="#313131"
            />
            <input
              type="email"
              placeholder="Email"
              className="apparence-none w-full outline-none "
              required
            />
          </div>
          <div className="flex lg:w-96 py-2 rounded-md items-center px-2 border border-gray-400">
            <Icon
              icon="mdi:password-outline"
              className="w-6 h-6 mr-2"
              color="#313131"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              className="apparence-none w-full outline-none"
              required
            />
          </div>
          <div className="flex flex-col">
            <Button label="Se connecter" />
            <p className="text-sm mt-3 text-center">
              Vous n'avez pas de compte ?
              <a href="./" className="text-primary">
                S'inscrire
              </a>
            </p>
          </div>
        </form>
        <div className="flex justify-end">
          <img src={LoginPicture} alt="" className="w-4/5 h-4/5" />
        </div>
      </div>
      
    </div>
  )
}

export default Login
