import { styled } from "styled-components";
import { FaTimes } from "react-icons/fa";
import { useDashboardContext } from "../pages/DashboardLayout";
import Logo from "./Logo";
import NavLinks2SM from "./NavLinks2SM";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <aside
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container  "
        }
      >
        <div className="content text-teal-500 bg-base-200 ">
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <div className="logo m-20 scale-150">
            <Logo />
          </div>

          <NavLinks2SM />
        </div>
      </aside>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  @media (min-width: 992px) {
    display: none;
  }
  .sidebar-container {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    transition: all 0.3s linear;
    display: grid;
    grid-template-columns: 1fr;
  }
  .show-sidebar {
    z-index: 99;
    transform: translateX(-100%);
  }
  .content {
    position: relative;
    padding: 4rem 2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100vw;
  }

  .nav-links {
    /* padding-top: 2rem; */
    display: flex;
    flex-direction: column;
    color: #0891b2;
  }
  .sidebar-links a {
    font-size: 2rem;
    text-transform: capitalize;
    transition: var(--transition);

    letter-spacing: var(--pacing);
    display: inline-block;
    margin-bottom: 1.5rem;
  }
  .sidebar-links a:hover {
    color: var(--clr-primary-5);
  }

  .close-btn {
    right: 1rem;
    background: transparent;
    border: transparent;
    font-size: 3rem;
    color: #bb2525;
    position: absolute;
    left: 1rem;
    top: 1rem;
  }
  .close-btn:hover {
    color: #e66b6b;
  }
  .nav-link {
    display: flex;
    align-items: center;
  }

  .icon {
    font-size: 2rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
  }
  .active {
  }
`;
export default SmallSidebar;
