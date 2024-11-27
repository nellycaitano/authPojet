import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../components/Button";
import Forgotpassword from "../assets/forgotPassword.png";
import { useState } from "react";

function ForgotPassword() {
  const [showPassword, setShowPassword] = useState(false);

  const PasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center justify-center md:gap-x-40 lg:border lg:border-gray-300 lg:px-28 lg:rounded-md">
        <form action="" autoComplete="off" className="flex flex-col gap-4">
          <p className="lg:text-5xl text-xl mb-10 text-black31">Mot de passe oublié</p>
          <div className="fieldpassword">
            <Icon
              icon="mdi:password-outline"
              className="w-6 h-6 mr-2"
              color="#313131"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nouveau mot de passe"
              className="inputfield"
              required
            />
            <span className="" onClick={PasswordVisibility}>
              {showPassword ? (
                <Icon icon="weui:eyes-on-outlined" className="w-5 h-5" />
              ) : (
                <Icon icon="weui:eyes-off-outlined" className="w-5 h-5" />
              )}
            </span>
          </div>
          <div className="fieldpassword">
            <Icon
              icon="mdi:password-outline"
              className="w-6 h-6 mr-2"
              color="#313131"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirmer le mot de passe"
              className="inputfield"
              required
            />
            <span className="" onClick={PasswordVisibility}>
              {showPassword ? (
                <Icon icon="weui:eyes-on-outlined" className="w-5 h-5" />
              ) : (
                <Icon icon="weui:eyes-off-outlined" className="w-5 h-5" />
              )}
            </span>
          </div>
          <Button label="Valider" />
        </form>
        <div className="flex justify-end items-center lg:mt-4 mt-0">
          <img src={Forgotpassword} alt="" className="w-4/5 h-4/5" />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
