import {Outlet} from "react-router-dom";
import LayoutLink from "./ui/LayoutLink.jsx";
import {useContext} from "react";
import {TablesContext} from "../context/TablesContext.js";

const Layout = () => {
   const {data: tables, isLoading} = useContext(TablesContext)
   return (
      <div className='flex'>
         <div className='flex flex-col bg-[#636f83] w-[256px] min-h-[100vh] fixed'>
            <LayoutLink to='/constructor'>ok</LayoutLink>
            <LayoutLink to='/htmlElement'>html element</LayoutLink>
            <LayoutLink to='/htmlGroup'>html group</LayoutLink>
            {
               isLoading ? 'loading..' : tables?.map(table => <LayoutLink to={`/table/${table.id}`} key={table.id}>{table?.label}</LayoutLink>)
            }

         </div>
         <div className='w-[256px]'></div>
         <main className='p-8 w-full'>
            <div className='mx-auto max-w-7xl'>
               <Outlet/>
            </div>
         </main>
      </div>
   );
};

export default Layout;