const {db} = require("../database/db");

const types = {
   'text': 'text',
   'list': 'JSONB',
   'test': 'JSONB',
   'checkbox': 'bool',
   'img': 'varchar(255)',
   'html': 'text',
   'html_c': 'JSONB',
   'stack': 'JSONB',
}
class TableService {
   readFields(table, colsInfo) {
      const cols = {};

      for(const col of colsInfo){
         const key = Object.keys(col)[0]
         cols[key] = col[key]
      }

      delete cols.id;
      console.log('before', table)

      Object.keys(table).forEach(key => {
         if (['jsonb', 'json', 'text'].includes(cols[key]))
            table[key] = JSON.parse(table[key])
      })
   }
   toSqlType(fieldType) {
      return types[fieldType]
   }
}

module.exports = {
   TableService: new TableService()
}