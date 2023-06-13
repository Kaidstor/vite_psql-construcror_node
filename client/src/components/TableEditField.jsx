import ColTemplate from "./columns/colTemplate.jsx";
import ColList from "./columns/colList.jsx";
import ColStack from "./columns/colStack.jsx";

const TableEditField = ({column}) => {
   return (

      <div className='mt-4 flex gap-4'>
         {
            ['text', 'test', 'checkbox', 'img', 'html', 'html_c'].includes(column.type) ?
               <ColTemplate column={column}/>

            : column.type === 'list' ?
               <ColList column={column}/>

            : column.type === 'stack' ?
               <ColStack column={column}/>

            : <p>Неизвестный тип</p>
         }
      </div>
   );
};

export default TableEditField;