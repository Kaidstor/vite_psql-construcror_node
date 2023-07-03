import React, {useContext, useState} from 'react';
import {FieldContext} from "../../context/FieldContext.js";
import SelectField from "../ui/SelectField.jsx";
import {useQuery} from "@tanstack/react-query";
import {getEntities} from "../../http/tableAPI.js";
import InputText from "../ui/InputText.jsx";
import {Button} from "@mui/material";
import {SaveTableContext, SaveTableDispatchContext} from "../../context/SaveTableContext.js";

const HtmlListField = () => {
   const field = useContext(FieldContext)
   const state = useContext(SaveTableContext)
   const dispatch = useContext(SaveTableDispatchContext)

   const arr = state?.[field.id] || []

   const [valueInput, setValueInput] = useState();
   const [value, onChange] = useState();

   if (!field.meta.ref)
      return (
         <div>
            <p>Добавить поля</p>
            <InputText value={valueInput} placeholder={'p'} onChange={e => setValueInput(e.target.value)}/>
            <Button
               style={{marginLeft: 12}}
               variant='outlined'
               onClick={() => {
                  dispatch({type: 'changeCol', col: field.id, value: [...arr, valueInput]})
               }}
            >
               Добавить</Button>
            {
               arr?.map((select, i) =>
                  <div key={i}>Значение {i}: {select}</div>
               )
            }
         </div>
      );


   const {data, isLoading} = useQuery({
      queryKey: ['list', field.meta.ref],
      queryFn: () => getEntities(field.meta.ref)
   })
   return (
      <div>
         <select
            className='h-[2.5rem] border-[1px] rounded-md pl-2 pr-1 border-gray-300'
            value={value}
            onChange={e => onChange(e.target.value)}>
            <option value='-1'>Не выбрано</option>
            {data?.map((el, i) => <option key={i} value={i}>{el.name}</option>)}
         </select>
      </div>
   )
};

export default HtmlListField;