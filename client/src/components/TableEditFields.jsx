import TableEditField from "./TableEditField.jsx";
import {FieldsTypeContext} from "../context/FieldsTypeContext.js";

const types = [
   {name: 'Текст', value: 1, type: 'text'},
   {name: 'Список', value: 2, type: 'list'},
   {name: 'Тест', value: 3, type: 'test'},
   {name: 'Чекбокс', value: 4, type: 'checkbox'},
   {name: 'Изображение', value: 5, type: 'img'},
   {name: 'HTML', value: 6, type: 'html'},
   {name: 'HTML контейнер', value: 7, type: 'html_c'},
   {name: 'Очередь', value: 8, type: 'stack'},
]

const TableEditFields = ({fields}) => {
   return (
      <FieldsTypeContext.Provider value={types}>
         {
            [...Array(fields?.col || 0).keys()].map(i => {
               const column = {...fields[`col_${i + 1}`], id: `col_${i + 1}`}
               return <TableEditField key={i} column={column} />
            })
         }
      </FieldsTypeContext.Provider>
   );
};

export default TableEditFields;