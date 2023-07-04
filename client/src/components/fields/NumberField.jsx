import React, {useContext} from 'react';
import {Input} from "@mui/material";
import {FieldContext} from "../../context/FieldContext.js";
import {SaveTableContext, SaveTableDispatchContext} from "../../context/SaveTableContext.js";

const NumberField = () => {
   const field = useContext(FieldContext)
   const state = useContext(SaveTableContext);
   const dispatch = useContext(SaveTableDispatchContext);

   return (
      <Input
         value={state[field.id]}
         className={'mt-2'}
         placeholder={'Число'}
         onChange={e => {
            if (isNaN(e.target.value)) return;
            dispatch({type: 'changeCol', col: field.id, value: e.target.value})
         }}
      />
   );
};

export default NumberField;