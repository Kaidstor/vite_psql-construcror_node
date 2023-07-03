import React, {useContext, useEffect, useReducer} from 'react';
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {getTable, getTableRecord, saveEntity} from "../http/tableAPI.js";
import TableFields from "../components/TableFields.jsx";
import {HtmlGroupsAndElementsListContext} from "../context/HtmlGroupsAndElementsListContext.js";
import {Button} from "@mui/material";
import saveTableReducer from "../recucers/saveTableReducer.js"
import {SaveTableContext, SaveTableDispatchContext} from "../context/SaveTableContext.js";
import {getHtmlElements} from "../http/htmlElementAPI.js";
import {getHtmlGroups} from "../http/htmlGroupAPI.js";

const TablePageRecord = () => {
   const {tableId, id} = useParams()
   const [state, dispatch] = useReducer(saveTableReducer, {}, val => val)

   const {data: record, isLoading: isLoadingRecord} = useQuery({
      queryKey: ['tableRecord', id],
      queryFn: () => getTableRecord(tableId, id),
      refetchOnWindowFocus: false
   })

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
      queryKey: [`table_${tableId}`],
      queryFn: () => getTable(tableId)
   });

   useEffect(() => {
      if (!isLoadingRecord){
         console.log('dispatch')
         dispatch({type: 'setRecord', value: record})
      }
   }, [isLoadingRecord])

   return (
      <SaveTableContext.Provider value={state}>
         <SaveTableDispatchContext.Provider value={dispatch}>
            <HtmlGroupsAndElementsListContext.Provider value={[...(htmlElements || []), ...(htmlGroups || [])]}>
               <h1 className='text-4xl'>{table?.name}</h1>

               <TableFields fields={table?.structure}/>
               <Button
                  variant='outlined'
                  style={{marginTop: 20}}
                  onClick={() => {
                     if (table.structure.col > Object.keys(state).length) alert('Не все поля заполнены')
                     else{
                        saveEntity(tableId, id, state).then(r =>
                           console.log(r)
                        )
                     }
                  }}
               >Сохранить запись</Button>

               {/*<Button*/}
               {/*   variant='outlined'*/}
               {/*   style={{marginTop: 20}}*/}
               {/*   onClick={() => console.log(state)}*/}
               {/*>CHECK</Button>*/}
            </HtmlGroupsAndElementsListContext.Provider>
         </SaveTableDispatchContext.Provider>
      </SaveTableContext.Provider>
   );
};

export default TablePageRecord;