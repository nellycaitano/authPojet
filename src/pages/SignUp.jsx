import React from "react";
import { Icon } from "@iconify/react";
import Button from "../components/Button";
import SignUpPicture from "../assets/signup.png";

function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center justify-center md:gap-x-60">
        <div className="">
          <img src={SignUpPicture} alt="" className="w-4/5 h-4/5" />
        </div>
        <form action="" className="flex flex-col gap-4">
          <p className="text-5xl mb-10 text-black31">S'inscrire</p>
          <div className="flex lg:w-96 py-2 rounded-md items-center px-2 border border-gray-400">
            <Icon
              icon="solar:user-linear"
              className="w-6 h-6 mr-2"
              color="#313131"
            />
            <input
              type="text"
              placeholder="Username"
              className="apparence-none w-full outline-none"
              required
            />
          </div>
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
            <Button label="S'inscrire" />
            <p className="text-sm mt-3 text-center">
              Vous avez déjà un compte ?
              <a href="./" className="text-primary">
                Se connecter
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
