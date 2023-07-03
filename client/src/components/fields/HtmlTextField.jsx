import React, {useContext, useState} from 'react';
import {Input} from "@mui/material";
import {saveTable} from "../../http/tableAPI.js";
import {SaveTableContext, SaveTableDispatchContext} from "../../context/SaveTableContext.js";
import {FieldContext} from "../../context/FieldContext.js";

const HtmlTextField = () => {
   const field = useContext(FieldContext)
   const state = useContext(SaveTableContext);
   const dispatch = useContext(SaveTableDispatchContext);

   console.log(state?.[field.id])

   return (
      <Input
         value={state?.[field.id]}
         className={'mt-2'}
         placeholder={'Текст'}
         onChange={e => dispatch({type: 'changeCol', col: field.id, value: e.target.value})}
      />
   );
};

export default HtmlTextField;