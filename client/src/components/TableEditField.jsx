import ColEditTemplate from "./columns/colEditTemplate.jsx";
import ColEditList from "./columns/colEditList.jsx";
import ColEditStack from "./columns/colEditStack.jsx";

const TableEditField = ({column}) => {
   return (

      <div className='mt-4 flex gap-4'>
         {
            ['text', 'number', 'test', 'checkbox', 'img', 'html', 'html_c'].includes(column.type) ?
               <ColEditTemplate column={column}/>

            : column.type === 'list' ?
               <ColEditList column={column}/>

            : column.type === 'stack' ?
               <ColEditStack column={column}/>

            : <p>Неизвестный тип</p>
         }
      </div>
   );
};

export default TableEditField;