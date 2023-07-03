import React, {useContext} from 'react';
import {HtmlGroupsAndElementsListContext} from "../../context/HtmlGroupsAndElementsListContext.js";

const SelectField = ({value, onChange}) => {
   const data = useContext(HtmlGroupsAndElementsListContext)

   return <select
         className='h-[2.5rem] border-[1px] rounded-md pl-2 pr-1 border-gray-300'
         value={value}
         onChange={onChange}>
         <option value='-1'>Не выбрано</option>
         {data?.map((el, i) => <option key={i} value={i}>{el.name}</option>)}
      </select>

};

export default SelectField;