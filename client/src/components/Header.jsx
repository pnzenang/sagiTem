import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <header className="bg-neutral py-10 text-neutral-content header">
        <div className="align-element flex justify-center sm:justify-end">
          {/* USER */}
          {/* LINKS */}
          <div className="flex gap-x-6 justify-center items-center">
            <Link
              to="/login"
              className="link link-hover text-xs sm:text-sm btn btn-primary"
            >
              Login
            </Link>
            <Link
              to="register"
              className="link link-hover text-xs sm:text-sm btn btn-secondary "
            >
              Register
            </Link>
          </div>
        </div>
      </header>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .header {
    height: 8rem;
  }
`;
export default Header;
