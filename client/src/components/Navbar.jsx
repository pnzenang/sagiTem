import { BsCart3, BsMoonFill, BsSunFill } from 'react-icons/bs';
import { FaBarsStaggered, FaThemeisle } from 'react-icons/fa6';
import { NavLinks } from '../components';
import { styled } from 'styled-components';
import Logo from './Logo';
import { useHomeContext } from '../pages/HomeLayout';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../features/themeSlice';

const Navbar = () => {
  const { toggleSidebar } = useHomeContext();

  const dispatch = useDispatch();

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className='bg-base-200 sticky top-0 flex  h-20 place-content-center z-10'>
      <div className=' align-element  navbar '>
        <div className='navbar-start'>
          {/* TITLE */}
          <div className='hidden lg:block '>
            <Logo />
          </div>
          <button className='nav-btn lg:hidden' onClick={toggleSidebar}>
            <FaBarsStaggered className='h-8 w-8 text-primary' />
          </button>
        </div>
        <div className='navbar-center hidden lg:flex '>
          <ul className='menu menu-horizontal'>
            <NavLinks />
          </ul>
        </div>
        <div className='navbar-end'>
          {/* THEME SETUP */}
          <label className='swap swap-rotate '>
            <input type='checkbox' onChange={handleTheme} />
            {/* sun icon */}
            <BsMoonFill className='swap-on h-7 w-7 text-primary' />
            {/* moon icon */}
            <BsSunFill className='swap-off h-7 w-7 tex warning' />
          </label>
        </div>
      </div>
    </nav>
  );
};
const Wrapper = styled.section`
  .nav-btn {
    background: transparent;
    border-color: transparent;
    color: red;
    font-size: 2rem;
    cursor: pointer;
    justify-self: end;
  }
`;
export default Navbar;
