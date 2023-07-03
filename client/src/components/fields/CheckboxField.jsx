import React, {useContext} from 'react';
import {Input} from "@mui/material";
import {Checkbox} from "@mui/material";
import {SaveTableContext, SaveTableDispatchContext} from "../../context/SaveTableContext.js";
import {FieldContext} from "../../context/FieldContext.js";

const CheckboxField = () => {
   const field = useContext(FieldContext)
   const state = useContext(SaveTableContext);
   const dispatch = useContext(SaveTableDispatchContext);

   return (
      <Checkbox
         type='checkbox'
         value={state?.[field.id]}
         onChange={e => dispatch({type: 'changeCol', col: field.id, value: e.target.value})}
      />
   );
};

export default CheckboxField;