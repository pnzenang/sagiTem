import { FaAlignLeft } from "react-icons/fa6";
import { styled } from "styled-components";

import { useDashboardContext } from "../pages/DashboardLayout";
import { Logo } from "../components";
import LogoutContainer from "./LogoutContainer";

const Navigation = () => {
  const { toggleSidebar } = useDashboardContext();
  return (
    <Wrapper className=" navbar bg-base-200 ">
      <div className="nav-center h-20  ">
        <button
          type="button"
          className="toggle-btn w-7 h-7 "
          onClick={toggleSidebar}
        >
          <FaAlignLeft className="text-primary" />
        </button>
        <div>
          <div className="logo">
            <Logo />
          </div>
          <h4 className="logo-text text-3xl text-cyan-600 capitalize">
            dashboard
          </h4>
        </div>
        <div className="btn-container text-1xl">
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.nav`
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;

  top: 0;

  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    /* color: #0891b2; */
  }
  .logo-text {
    display: none;
  }
  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }
  .btn-container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .btn {
  }
  @media screen and (min-width: 992px) {
    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`;
export default Navigation;
