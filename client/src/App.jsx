import './App.css'
import {Route, Routes} from "react-router-dom";
import Constructor from "./pages/constructor.jsx";
import {TablesContext} from "./context/TablesContext.js";
import Layout from "./components/Layout.jsx";
import {useQuery} from "@tanstack/react-query";
import {getTables} from "./http/tableAPI.js";

function App() {
   const tables = useQuery({queryKey: ['allTables'], queryFn: getTables})

  return (
     <TablesContext.Provider value={tables}>
       <Routes>
          <Route path='/' element={<Layout/>}>
             <Route index element={<div className='text-sm bg-gray-700 color-[red]'>cool  22</div>}/>
             <Route path='constructor' element={<Constructor/>}/>
          </Route>
       </Routes>
    </TablesContext.Provider>
  )
}

export default App
