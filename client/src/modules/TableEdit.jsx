import {Button, Input} from "@mui/material";
import {useContext} from "react";
import TableEditFields from "../components/TableEditFields.jsx";
import {TableEditContext, TableEditDispatchContext} from "../context/TableEditContext.js";
import {saveTable} from "../http/tableAPI.js";


const TableEdit = ({table}) => {
   const state= useContext(TableEditContext)
   const dispatch = useContext(TableEditDispatchContext)



   return (
      <div>
         <Input
            classes={{classes: 'text-2xl'}}
            sx={{fontSize: 40, width: '100%'}} // font size of input label
            className='my-4 text-2xl font-bold'
            value={table.name}
         />
         <div className='flex justify-between'>
            <div>
               <TableEditFields fields={state}/>

               <div className='mt-4 flex gap-4'>
                  <Button variant="contained"
                          onClick={() => {
                             dispatch({type: 'add'})
                          }}
                  >Добавить поле</Button>
                  <Button variant="contained"
                          onClick={() => {
                             saveTable(table.id, state)
                          }}
                  >Сохранить</Button>
               </div>
            </div>

            <pre className='text-xs mt-4'>structure: {JSON.stringify(state, null, 2)}</pre>
         </div>
      </div>
   );
};

export default TableEdit;