import { styled } from "styled-components";
import NavLinks2 from "./NavLinks2";
import Logo from "./Logo";
import { useDashboardContext } from "../pages/DashboardLayout";

const BigSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <aside
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container  "
        }
      >
        <div className="content text-teal-500 bg-base-200 ">
          <header className="logo flex  scale-100 items-center ">
            <Logo />
          </header>

          <NavLinks2 />
        </div>
      </aside>
    </Wrapper>
  );
};
const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .sidebar-container {
      min-height: 100vh;
      height: 100%;
      width: 300px;
      margin-left: -400px;
      transition: margin-left 0.3s ease-in-out;
    }
    .content {
      position: sticky;
      top: 0;
      height: 100vh;
    }
    .show-sidebar {
      margin-left: 0;
    }
    header {
      height: 6rem;
      display: flex;
      align-items: center;
      padding-left: 2rem;
    }
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
      color: #0891b2;
    }
    .nav-link {
      display: flex;
      align-items: center;
      padding: 0.2rem 0;
      padding-left: 0.5rem;
      text-transform: capitalize;
      transition: padding-left 0.3s ease-in-out;
    }
    .nav-link:hover {
      padding-left: 2rem;
      transition: 0.3s ease-in-out;
    }
    .icon {
      font-size: 2rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
    }
    .active {
    }
    .pending {
    }
  }
`;
export default BigSidebar;
