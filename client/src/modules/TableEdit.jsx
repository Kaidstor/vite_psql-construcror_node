import {Button, Input} from "@mui/material";
import {useContext, useState} from "react";
import TableEditFields from "../components/TableEditFields.jsx";
import {TableEditContext, TableEditDispatchContext} from "../context/TableEditContext.js";
import {saveTable} from "../http/tableAPI.js";
import {TablesContext} from "../context/TablesContext.js";


const TableEdit = () => {
   const {refetch} = useContext(TablesContext)
   const state= useContext(TableEditContext)
   const dispatch = useContext(TableEditDispatchContext)
   const [name, setName] = useState(state.name)

   function handleInputChange(e){
      dispatch({type: 'changeTableName', value: e.target.value})
      setName(e.target.value)
   }

   return (
      <div>
         <Input
            classes={{classes: 'text-2xl'}}
            sx={{fontSize: 40, width: '100%'}} // font size of input label
            className='my-4 text-2xl font-bold'
            value={state.name}
            onChange={handleInputChange}
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
                  <Button
                     variant="contained"
                     onClick={() => {
                        saveTable(state.id, {structure: state, name}).then(
                           (d) => refetch()
                        )
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