import React from "react";
import LoginPicture from "../assets/login.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function Login() {
  // const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
  // const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center justify-center flex-col-reverse lg:gap-x-40 lg:border lg:border-gray-300 lg:px-28 lg:rounded-md">
        <form action="" autoComplete="off" className="flex flex-col gap-4">
          <p className="lg:text-5xl text-xl mb-10 text-black31">Se connecter</p>
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
          <div className="flex flex-col">
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
            <Link
              to="/forgotpassword"
              className="text-primary text-sm mt-3 text-center flex justify-end"
            >
              {" "}
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="flex flex-col">
            <Button label="Se connecter" />
            <p className="text-sm mt-3 text-center">
              Vous n'avez pas de compte ?{" "}
              <Link to="/" className="text-primary">
                {" "}
                S'inscrire
              </Link>
            </p>
          </div>
        </form>
        <div className="flex justify-end">
          <img src={LoginPicture} alt="" className="w-4/5 h-4/5" />
        </div>
      </div>
    </div>
  );
}

export default Login;
