import React from 'react';

const Select = ({data, value, onChange}) => {
   return <select
      className='h-[2.5rem] border-[1px] rounded-md pl-2 pr-1 border-gray-300'
      value={value}
      onChange={onChange}>
      <option value={-1}>Не выбрано</option>
      {data?.map(el => <option key={el.id} value={el.id}>{el.name}</option>)}
   </select>
};

export default Select;