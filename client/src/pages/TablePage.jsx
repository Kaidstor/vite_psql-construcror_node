import React, {useEffect, useReducer} from 'react';
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {addEntity, getTable} from "../http/tableAPI.js";
import TableFields from "../components/TableFields.jsx";
import {getHtmlElements} from "../http/htmlElementAPI.js";
import {getHtmlGroups} from "../http/htmlGroupAPI.js";
import {HtmlGroupsAndElementsListContext} from "../context/HtmlGroupsAndElementsListContext.js";
import {Button} from "@mui/material";
import saveTableReducer from "../recucers/saveTableReducer.js"
import {SaveTableContext, SaveTableDispatchContext} from "../context/SaveTableContext.js";
import TablesList from "../modules/TablesList.jsx";

const TablePage = () => {
   const {id} = useParams()
   const [state, dispatch] = useReducer(saveTableReducer, {}, val => val)

   const {data: htmlElements, isLoading: isLoadingElements} = useQuery({
      queryKey: ['elements'],
      queryFn: getHtmlElements,
      cacheTime: 30000,
      refetchOnWindowFocus: false
   })

   const {data: htmlGroups, isLoading: isLoadingGroups} = useQuery({
      queryKey: ['groups'],
      queryFn: getHtmlGroups,
      cacheTime: 30000,
      refetchOnWindowFocus: false
   })

   const {data: table, isLoading} = useQuery({
      queryKey: [`table_${id}`],
      queryFn: () => getTable(id)
   });

   useEffect(() => {
      dispatch({type: 'setRecord', value: {}})
   }, [])

   return (
      table ?
      <SaveTableContext.Provider value={state}>
         <SaveTableDispatchContext.Provider value={dispatch}>
            <HtmlGroupsAndElementsListContext.Provider value={[...(htmlElements || []), ...(htmlGroups || [])]}>
               <h1 className='text-4xl'>{table?.name}</h1>

               <TableFields fields={table?.structure} tableId={table?.id}/>
               <Button
                  variant='outlined'
                  style={{marginTop: 20}}
                  onClick={() => {
                     if (table.structure.col > Object.keys(state).length) alert('Не все поля заполнены')
                     else{
                        addEntity(id, state).then(r =>
                           console.log(r)
                        )
                     }
                  }}
               >Добавить запись</Button>

               {/*<Button*/}
               {/*   variant='outlined'*/}
               {/*   style={{marginTop: 20}}*/}
               {/*   onClick={() => console.log(state)}*/}
               {/*>CHECK</Button>*/}

               <TablesList tableId={id} tableInfo={table}/>
            </HtmlGroupsAndElementsListContext.Provider>
         </SaveTableDispatchContext.Provider>
      </SaveTableContext.Provider>
      :
         'Таблица не существует!'
   );
};

export default TablePage;