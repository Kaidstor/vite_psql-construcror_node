import React from 'react';
import TableField from "./TableField.jsx";
import {FieldContext} from "../context/FieldContext.js";

const TableFields = ({fields, tableId}) => {
   return (
      <div className='flex flex-col gap-4'>
         {
            [...Array(fields?.col || 0).keys()].map(i => {
               const field = {...fields[`col_${i + 1}`], id: `col_${i + 1}`}
               return <FieldContext.Provider value={field} key={`table_${tableId}_col_${i}`}>
                  <div><TableField field={field} /></div>
               </FieldContext.Provider>
            })
         }
      </div>
   );
};

export default TableFields;