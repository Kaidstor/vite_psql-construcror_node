import {Link, NavLink} from "react-router-dom";
import {Outlet} from "react-router-dom";
import LayoutLink from "./ui/LayoutLink.jsx";

const setActive = ({isActive}) => isActive ? 'bg-white' : ''
const Layout = () => {
   return (
      <div className='flex'>
         <div className='flex flex-col gap-4 p-8 bg-[#636f83] w-[256px] h-[100vh]'>
            <LayoutLink to='constructor'>ok</LayoutLink>
            <LayoutLink to='#'>ok</LayoutLink>
            <LayoutLink to='#'>ok</LayoutLink>
            <LayoutLink to='#'>ok</LayoutLink>
         </div>
         <main className='p-8 w-full'>
            <div className='mx-auto max-w-7xl'>
               <Outlet/>
            </div>
         </main>
      </div>
   );
};

export default Layout;