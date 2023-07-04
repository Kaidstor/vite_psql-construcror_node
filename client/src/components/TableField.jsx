import React, {useContext} from 'react';
import HtmlContainerField from "./fields/HtmlContainerField.jsx";
import {FieldContext} from "../context/FieldContext.js";
import HtmlTextField from "./fields/HtmlTextField.jsx";
import HtmlListField from "./fields/HtmlListField.jsx";
import TestField from "./fields/TestField.jsx";
import ImgField from "./fields/ImgField.jsx";
import CheckboxField from "./fields/CheckboxField.jsx";
import HtmlField from "./fields/HtmlField.jsx";
import NumberField from "./fields/NumberField.jsx";

const types = [
   {name: 'Текст', value: 1, type: 'text'},
   {name: 'Чисто', value: 1, type: 'number'},
   {name: 'Список', value: 2, type: 'list'},
   {name: 'Тест', value: 3, type: 'test'},
   {name: 'Чекбокс', value: 4, type: 'checkbox'},
   {name: 'Изображение', value: 5, type: 'img'},
   {name: 'HTML', value: 6, type: 'html'},
   {name: 'HTML контейнер', value: 7, type: 'html_c'},
   {name: 'Очередь', value: 8, type: 'stack'},
]

const TableField = () => {
   const field = useContext(FieldContext)
   return (
      <div>
         <div className='flex gap-6 mt-8 text-xl'>
            <p>{field.name}</p>
            <p>Тип: {field.type}</p>
            {
               field.meta &&
                  <p>Метаданные: {JSON.stringify(field.meta)}</p>
            }

         </div>
         {
            field.type === 'text' ?
               <HtmlTextField/> :
            field.type === 'number' ?
               <NumberField/> :
            field.type === 'list' ?
               <HtmlListField/> :
            field.type === 'html_c' ?
               <HtmlContainerField/> :
            field.type === 'html' ?
               <HtmlField/> :
            field.type === 'test' ?
               <TestField/> :
            field.type === 'img' ?
               <ImgField/> :
            field.type === 'checkbox' ?
               <CheckboxField/> :
                  null
         }
      </div>
   );
};

export default TableField;