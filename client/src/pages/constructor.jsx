import {Autocomplete, Box, Button, CircularProgress, Stack, TextField} from "@mui/material";
import {useContext, useEffect, useReducer, useState} from "react";
import {addTable, removeTable, getTable} from "../http/tableAPI.js";
import TableEdit from "../modules/TableEdit.jsx";
import tableReducer from "../recucers/tableReducer.js";
import {TablesContext} from "../context/TablesContext.js";
import {TableEditContext, TableEditDispatchContext} from "../context/TableEditContext.js";

const Constructor = () => {
   const [state, dispatch] = useReducer(tableReducer, {})
   const {data, isLoading, refetch} = useContext(TablesContext)
   const [tableId, setTableId] = useState(null)
   const [currentTable, setCurrentTable] = useState(null)

   async function setCurrentTableHandler(tableId){
      if (tableId) {
         const table = await getTable(tableId);
         setCurrentTable(table)
         dispatch({type: 'changeTable', state: table?.structure})
      }
   }

   useEffect(() => {
      setCurrentTableHandler(tableId?.id)
   }, [tableId])


   return (
      <TableEditContext.Provider value={state}>
         <TableEditDispatchContext.Provider value={dispatch}>
            {
               isLoading ?
               <Box sx={{display: 'flex'}}>
                  <CircularProgress/>
               </Box>
               :
               <>
                  <div className='flex gap-4'>

                     <Stack spacing={1} sx={{ width: 300 }}>
                        <Autocomplete
                           value={tableId}
                           onChange={(e, newValue) => setTableId(newValue)}
                           disablePortal
                           noOptionsText='Нет сущностей'
                           id="combo-box-demo"
                           options={data}
                           sx={{width: 300}}
                           renderInput={(params) => <TextField {...params} label="Сущности"/>}
                        />
                     </Stack>

                     {
                        currentTable &&
                        <Button
                           onClick={() => {
                              removeTable(currentTable.id).then(() => {
                                 console.log('remove')
                                 refetch().then(() => {
                                    setTableId(null)
                                 })
                              })
                           }}
                           variant='outlined'
                           size='large'>Удалить
                        </Button>
                     }
                     <Button
                        onClick={() => {
                           addTable().then(table => {
                              refetch().then(() => {
                                 setTableId(table.id)
                              })
                           })
                        }}
                        variant='outlined'
                        size='large'>Добавить
                     </Button>
                  </div>
                  {
                     currentTable ?
                        <div className='mt-4'>
                           <TableEdit table={currentTable}/>
                        </div>
                        :
                        <div className='mt-4'>
                           <p>Таблица не выбрана</p>
                        </div>
                  }
               </>
            }
         </TableEditDispatchContext.Provider>
      </TableEditContext.Provider>
   );
};

export default Constructor;