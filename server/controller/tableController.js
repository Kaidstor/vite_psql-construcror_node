const {TableModel} = require("../database/models");
const {db} = require("../database/db");

class TableController{
   async findAll(req, res){
      const tables = await TableModel.findAll({raw: true})

      const data = tables?.map(el=> {
         return { label: el.name, id: el.id }
      }) || [];

      return res.json({message: 'ok', data})
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
   async add(req, res){
      try{
         // нашли last id
         const tableLast = await TableModel.findOne({order: [['id', 'DESC']], raw: true})
         const id = +tableLast?.id + 1 || 1

         // создали таблицу
         const dbName = `table_${id}`
         await db.query(` CREATE TABLE ${dbName} ( id bigserial ); `)

         // добавили инфу о новой таблице
         const table = await TableModel.create({name: `name ${id}`, dbName})
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

         const table = await TableModel.findOne({where: {id}})

         let queryStart = `ALTER TABLE ${table.dbName}`;
         let query = queryStart;

         [...Array(structure?.col || 0).keys()].map(i => {
            const col = `col_${i + 1}`
            const data = structure[col]
            const prevType = table.structure?.[col]?.type


            if (data.type !== prevType)
               query += `
                ALTER COLUMN ${col} TYPE TEXT, 
            `
         })


         if (queryStart === query) return res.json({message: 'Таблица не изменилась!'})

         query = query.substring(0, query.length - 1)
         await TableModel.update({structure}, {where: {id}})

         return res.json({message: 'ok', error: false})
      }
      catch(e) {
         return res.json({message: e.message, error: true})
      }

   }
   async remove(req, res){
      const {id} = req.params

      const table = await TableModel.findOne({where: {id}})

      await db.query(`
        DROP TABLE ${table.dbName};
      `)

      const data = await TableModel.destroy({where: {id}})

      return res.json({data, error: false})
   }
}

module.exports = {TableController: new TableController()}