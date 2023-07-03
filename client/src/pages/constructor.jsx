import {Autocomplete, Box, Button, CircularProgress, Stack, TextField} from "@mui/material";
import {useContext, useEffect, useReducer, useState} from "react";
import {addTable, removeTable, getTable} from "../http/tableAPI.js";
import TableEdit from "../modules/TableEdit.jsx";
import tableReducer from "../recucers/tableReducer.js";
import {TablesContext} from "../context/TablesContext.js";
import {TableEditContext, TableEditDispatchContext} from "../context/TableEditContext.js";
import {Link} from "react-router-dom";

const Constructor = () => {
   const {data, isLoading, refetch} = useContext(TablesContext)
   const [state, dispatch] = useReducer(tableReducer, {}, val => val)
   const [table, setTable] = useState(null)

   async function setCurrentTableHandler(tableId){
      if (tableId) {
         const table = await getTable(tableId);
         dispatch({type: 'changeTable', state: table?.structure, name: table.name, id: table.id})
      }
   }

   useEffect(() => {
      setCurrentTableHandler(table?.id)
   }, [table])

   useEffect(() => {
      if (table){
         for(const d of data)
            if (d.id === table.id) {
               setTable(d)
               console.log('table set')
            }
      }
   }, [data])


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
                           value={table}
                           onChange={(e, newValue) => setTable(newValue)}
                           disablePortal
                           noOptionsText='Нет сущностей'
                           id="combo-box-demo"
                           options={data}
                           sx={{width: 300}}
                           renderInput={(params) => <TextField {...params} label="Сущности"/>}
                        />
                     </Stack>

                     {
                        table &&
                        <Button
                           onClick={() => {
                              removeTable(table?.id).then(() => {
                                 refetch().then(() => {
                                    setTable(null)
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
                              setTable({label: table.name, id: table.id})
                              refetch()
                           })
                        }}
                        variant='outlined'
                        size='large'>Добавить
                     </Button>

                     {
                        table &&
                        <Link
                           className='MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeLarge MuiButton-outlinedSizeLarge MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeLarge MuiButton-outlinedSizeLarge css-9y1egq-MuiButtonBase-root-MuiButton-root'
                           to={`/table/${table?.id}`}
                           variant='outlined'
                           size='large'>Перейти к сущности
                        </Link>
                     }
                  </div>
                  {
                     table ?
                        <div className='mt-4'>
                           <TableEdit/>
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