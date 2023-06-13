import {useContext, useState} from "react";
import {TableEditDispatchContext} from "../../context/TableEditContext.js";
import {MenuItem, Select, Input} from "@mui/material";
import {FieldsTypeContext} from "../../context/FieldsTypeContext.js";

const ColTemplate = ({column}) => {
   const types = useContext(FieldsTypeContext)
   const [value, setValue] = useState(column.name === 'name' ? '' : column.name)
   const [type, setType] = useState(8)
   const dispatch = useContext(TableEditDispatchContext)

   const colId = column.id
   return (
      <>
         <Input
            type="text"
            placeholder="Название поля"
            onChange={e => setValue(e.target.value)}
            value={value}
         />

         <Select
            size='small'
            name={column.id}
            value={type}
            onChange={e => {
               const colType = types[e.target.value - 1].type

               dispatch({type: 'changeType', colType, colId})
               setType(e.target.value)
            }}
         >

            {types.map(type =>
               <MenuItem value={type.value} key={type.value}>{type.name}</MenuItem>
            )}
         </Select>
         {

         }
      </>
   );
};

export default ColTemplate;