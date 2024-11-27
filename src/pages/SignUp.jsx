import React from "react";
import { Icon } from "@iconify/react";
import Button from "../components/Button";
import SignUpPicture from "../assets/signup.png";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center justify-center md:gap-x-40 lg:border lg:border-gray-300 lg:px-28 lg:rounded-md">
        <div className="">
          <img src={SignUpPicture} alt="" className="w-4/5 h-4/5" />
        </div>
        <form action="" autoComplete="off" className="flex flex-col gap-4">
          <p className="lg:text-5xl text-xl mb-10 text-black31">S'inscrire</p>
          <div className="field">
            <Icon
              icon="solar:user-linear"
              className="w-6 h-6 mr-2"
              color="#313131"
            />
            <input
              type="text"
              placeholder="Username"
              className="inputfield"
              required
            />
          </div>
          <div className="field">
            <Icon
              icon="mdi:email-outline"
              className="w-6 h-6 mr-2"
              color="#313131"
            />
            <input
              type="email"
              placeholder="Email"
              className="inputfield"
              required
            />
          </div>
          <div className="fieldpassword">
            <Icon
              icon="mdi:password-outline"
              className="w-6 h-6 mr-2"
              color="#313131"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              className="inputfield"
              required
            />
            <Icon icon="weui:eyes-on-outlined" className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <Button label="S'inscrire" />
            <p className="text-sm mt-3 text-center">
              Vous avez déjà un compte ?{" "}
              <Link to="/login" className="text-primary">
                {" "}
                Se connecter
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
