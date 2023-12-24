import { Outlet } from 'react-router-dom';
import { Header, Navbar, Sidebar } from '../components';
import { createContext, useContext, useState } from 'react';

const HomeContext = createContext();

const HomeLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <HomeContext.Provider value={{ showSidebar, toggleSidebar }}>
      <Header />
      <Navbar />
      <Sidebar />
      <section className='align-element py-20'>
        <Outlet />
      </section>
    </HomeContext.Provider>
  );
};
export const useHomeContext = () => useContext(HomeContext);
export default HomeLayout;
