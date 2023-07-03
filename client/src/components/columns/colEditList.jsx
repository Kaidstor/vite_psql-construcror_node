import {useContext, useState} from "react";
import {TableEditDispatchContext} from "../../context/TableEditContext.js";
import {FormControl, Input, InputLabel, MenuItem, Select} from "@mui/material";
import {TablesContext} from "../../context/TablesContext.js";
import {FieldsTypeContext} from "../../context/FieldsTypeContext.js";

// --- meta
// listType
// 0 - свой список
// 1 - ссылка на сущность
// ref: ссылка на сущность default: null

const ColTemplate = ({column}) => {
   const types = useContext(FieldsTypeContext)

   const [value, setValue] = useState(column.name === 'name' ? '' : column.name)
   const {data: tables} = useContext(TablesContext)
   const [type, setType] = useState(2)
   const [typeList, setTypeList] = useState(column.meta.listType)
   const [essence, setEssence] = useState(column.meta.ref)
   const dispatch = useContext(TableEditDispatchContext)

   const colId = column.id
   return (
      <>
         <Input
            type="text"
            placeholder="Название поля"
            onChange={e => {
               setValue(e.target.value)
               dispatch({type: 'changeColName', name: e.target.value, colId})
            }}
            value={value}
         />

         <Select
            size='small'
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

         <Select
            size='small'
            value={typeList}
            onChange={e => {
               setTypeList(e.target.value)
               dispatch({type: 'changeListType', listType: e.target.value, colId})
            }}
         >
            <MenuItem value='0'>Свой список</MenuItem>
            <MenuItem value='1'>Сущность</MenuItem>
         </Select>

         {
            typeList === '1' &&
               <FormControl sx={{ m: 1, minWidth: 200 }} size="small" className='!m-0'>
                  <InputLabel id="demo-simple-select-autowidth-label">Ссылка на сущность</InputLabel>
                  <Select
                  value={essence}
                  autoWidth
                  label='Ссылка на сущность'
                  onChange={e => {
                     setEssence(e.target.value)
                     dispatch({type: 'changeListEssence', ref: e.target.value, colId})
                  }}
               >
                  {tables.map((table) =>
                     <MenuItem key={table.id} value={table.id}>{table.label}</MenuItem>
                  )}
               </Select>
               </FormControl>
         }
      </>
   );
};

export default ColTemplate;