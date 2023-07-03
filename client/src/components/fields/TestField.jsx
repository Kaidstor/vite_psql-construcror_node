import React, {useContext, useState} from 'react';
import {FieldContext} from "../../context/FieldContext.js";
import {SaveTableContext, SaveTableDispatchContext} from "../../context/SaveTableContext.js";
import InputText from "../ui/InputText.jsx";
import {Button} from "@mui/material";

const TestField = () => {
   const field = useContext(FieldContext)
   const state = useContext(SaveTableContext)
   const dispatch = useContext(SaveTableDispatchContext)

   const arr = state?.[field.id]?.constructor === Array ? state?.[field.id] : []

   const [valueInput, setValueInput] = useState('');

   return (
      <div className={'mt-2'}>
         <InputText
            value={valueInput}
            placeholder={'Вариант ответа'}
            onChange={e => setValueInput(e.target.value)}/>
         <Button
            style={{marginLeft: 12}}
            variant='outlined'
            onClick={() => {
               dispatch({type: 'changeCol', col: field.id, value: [...arr, {value: valueInput, check: false, actions: []}]})
            }}
         >
            Добавить</Button>
         {
            arr.map((test, i) =>
               <div key={i} className='flex gap-2 items-center'>
                  <input
                     checked={test.check}
                     type="checkbox" onChange={e => {
                     const tempArr = [...arr]
                     tempArr[i] = {...tempArr[i], check: e.target.checked}

                     dispatch({
                        type: 'changeCol',
                        col: field.id,
                        value: tempArr
                     })
                  }}/>
                  <p>
                     {test.value}
                  </p>
               </div>
            )
         }
      </div>
   );
};

export default TestField;