import React from 'react';
import {Input} from "@mui/material";

const InputText = ({fontSize=40, width='100%', placeholder='', value, onChange}) => {
   return (
      <Input
         sx={{fontSize, width}} // font size of input label
         className='my-4 text-2xl font-bold'
         placeholder='Высота'
         value={value}
         onChange={onChange}
      />
   );
};

export default Input;