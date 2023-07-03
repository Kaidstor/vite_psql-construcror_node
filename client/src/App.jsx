import './App.css'
import {Route, Routes} from "react-router-dom";
import Constructor from "./pages/constructor.jsx";
import {TablesContext} from "./context/TablesContext.js";
import Layout from "./components/Layout.jsx";
import {useQuery} from "@tanstack/react-query";
import {getTables} from "./http/tableAPI.js";
import TablePage from "./pages/TablePage.jsx";
import HtmlElementPage from "./pages/HtmlElementPage.jsx";
import HtmlElementsPage from "./pages/HtmlElementsPage.jsx";
import HtmlGroupPage from "./pages/HtmlGroupPage.jsx";
import HtmlGroupsPage from "./pages/HtmlGroupsPage.jsx";
import TablePageRecord from "./pages/TablePageRecord.jsx";

function App() {
   const tables = useQuery({queryKey: ['allTables'], queryFn: getTables})

  return (
     <TablesContext.Provider value={tables}>
       <Routes>
          <Route path='/' element={<Layout/>}>
             <Route index element={<Constructor/>}/>
             <Route path='constructor' element={<Constructor/>}/>
             <Route path='table/:id' element={<TablePage/>}/>
             <Route path='table/:tableId/:id' element={<TablePageRecord/>}/>

             <Route path='htmlElement' element={<HtmlElementsPage/>}/>
             <Route path='htmlElement/:id' element={<HtmlElementPage/>}/>

             <Route path='htmlGroup' element={<HtmlGroupsPage/>}/>
             <Route path='htmlGroup/:id' element={<HtmlGroupPage/>}/>


             <Route path='*' element={<Constructor/>}/>
          </Route>
       </Routes>
    </TablesContext.Provider>
  )
}

export default App
