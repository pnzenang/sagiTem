import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";

const Logo = () => {
  return (
    <NavLink to="/" className="flex  text-3xl items-center">
      <img src={logo} alt="" />
    </NavLink>
  );
};
export default Logo;
