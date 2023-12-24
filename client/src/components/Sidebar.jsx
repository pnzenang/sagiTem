import { FaTimes } from "react-icons/fa";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useHomeContext } from "../pages/HomeLayout";
import SocialLinks from "./SocialLinks";
import { Logo } from "../components";
import { links } from "../utils/links";

const Sidebar = () => {
  const { showSidebar, toggleSidebar } = useHomeContext();

  return (
    <Wrapper>
      <aside
        className={
          showSidebar ? "sidebar show-sidebar" : "sidebar bg-base-100 "
        }
      >
        <div className="nav-header mx-4">
          <div>
            <Logo />
          </div>
          <button className="close-btn" id="cose-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>
        <ul className="sidebar-links text-cyan-600 ">
          {links.map((link) => {
            const { id, text, url } = link;
            return (
              <li key={id} className="hover:text-primary">
                <Link to={url} onClick={toggleSidebar}>
                  {text}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex gap-x-6 justify-center items-center">
          <Link
            to="/login"
            className="link link-hover text-xs sm:text-sm btn btn-primary"
          >
            sign in
          </Link>
          <Link
            to="register"
            className="link link-hover text-xs sm:text-sm btn btn-secondary "
          >
            Register
          </Link>
        </div>
        <div className="social-links">
          <SocialLinks />
        </div>
      </aside>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 4;
    transition: all 0.3s linear;
    display: grid;
    grid-template-columns: 1fr;
  }
  .show-sidebar {
    z-index: 99;
    transform: translateX(-100%);
  }
  .nav-header {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    height: 5rem;
  }

  .sidebar-links {
    text-align: center;
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
  }
  .close-btn:hover {
    color: #e66b6b;
  }
  .social-links {
    display: grid;
    place-items: center;
    margin-bottom: 5rem;
  }

  @media screen and (min-width: 1024px) {
    transform: translateX(-100%);
  }
`;
export default Sidebar;
