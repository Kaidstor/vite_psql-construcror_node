const {TableModel} = require("../database/models");
const {db} = require("../database/db");
const {col} = require("sequelize");
const {TableService} = require("../services/tableService");

class TableController{
   async findAll(req, res){
      const tables = await TableModel.findAll({raw: true})

      const data = tables?.map(el=> {
         return { label: el.name, id: el.id }
      }) || [];

      return res.json({message: 'ok', data})
   }
   async findRecords(req, res){
      const {table} = req.params
      const [tables] = await db.query(`
         SELECT * FROM {table}
      `)

      return res.json(table)
   }
   async findOne(req, res){
      try{
         const {id} = req.params

         const table = await TableModel.findOne({where: {id}})
         return res.json({data: table, error: false})
      }
      catch (e) {
         return res.json({message: e.message, error: true})
      }
   }
   async findOneTable(req, res){
      try{
         const {tableId, id} = req.params

         const [[table]] = await db.query(`
            SELECT * FROM table_${tableId} where id = ${id}
         `)
         delete table.id

         return res.json(table)
      }
      catch (e) {
         return res.json({message: e.message, error: true})
      }
   }
   async add(req, res){
      try{
         // нашли last id
         const tableLast = await TableModel.findOne({order: [['id', 'DESC']], raw: true})
         const id = +tableLast?.id + 1 || 1

         // создали таблицу
         const tableName = `table_${id}`
         await db.query(` CREATE TABLE ${tableName} ( id bigserial ); `)

         // добавили инфу о новой таблице
         const table = await TableModel.create({name: `name ${id}`, tableName})
         return res.json({data: table, error: false})
      }
      catch (e) {
         console.log(e.message)
      }
   }
   async save(req, res){
      try{
         const {id} = req.params;
         const {structure} = req.body;
         const name = structure.name || 'noname'

         const table = await TableModel.findOne({where: {id}})

         let queryStart = `ALTER TABLE ${table.tableName}\n`;
         let query = queryStart

         for (let i = 0; i < structure?.col; i++) {
            const col = `col_${i + 1}`
            const prevType = TableService.toSqlType(table.structure?.[col]?.type)
            const newType = TableService.toSqlType(structure[col].type)

            console.log(structure[col])
            console.log(`'${prevType}', '${newType}'`);
            if (!prevType)
               query += `ADD COLUMN ${col} ${newType},\n`
            // else if (prevType === 'JSONB' && newType === 'text') {
            //    query += `ALTER COLUMN ${col} TYPE ${newType} using ${col}#>>'{}',\n`
            // }
            else if (prevType === 'text' && newType === 'JSONB') {
               query += `ALTER COLUMN ${col} TYPE ${newType} using to_json(${col}::text),\n`
            }
            else if ((prevType === 'text' || prevType === 'varchar(255)') && newType === 'bool') {
               query += `ALTER COLUMN ${col} TYPE ${newType} using case WHEN coalesce(TRIM(${col}), '') = '' THEN TRUE ELSE FALSE END,\n`
            }
            else if (newType !== prevType) {
               query += `ALTER COLUMN ${col} TYPE ${newType} using ${col}::${newType},\n`
            }
         }

         if (table.structure === structure)
            return res.json({message: 'Таблица не изменилась!'})

         if (queryStart !== query){
            query = query.substring(0, query.length - 2)
            await db.query(query)
         }

         await TableModel.update({structure, name}, {where: {id}})

         return res.json({message: 'ok', error: false})
      }
      catch(e) {
         return res.json({message: e.message, error: true})
      }

   }
   async remove(req, res){
      try{
         const {id} = req.params

         const table = await TableModel.findOne({where: {id}})

         await db.query(`
        DROP TABLE ${table.tableName};
      `)

         const data = await TableModel.destroy({where: {id}})

         return res.json({data, error: false})
      }
      catch (e) {
         return res.status(400).json({message: e.message})
      }
   }
}

module.exports = {TableController: new TableController()}