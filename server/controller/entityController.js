const {TableModel} = require("../database/models");
const {db} = require('../database/db')
const {TableService} = require("../services/tableService");

const types = {
   checkbox: 'bool',
   img: 'varchar(255)',
   html: 'text',
   text: 'text',
   list: 'JSONB',
   test: 'JSONB',
   html_c: 'JSONB',
   stack: 'JSONB'
}

class EntityController{
   async findAll(req, res){
      try{
         const {tableName} = req.params
         const [tables] = await db.query(`
            SELECT * FROM ${tableName}
         `)

         return res.json(tables)
      }
      catch (e){
         return res.status(400).json({error: e.message})
      }
   }
   async add(req, res){
      try{
         const {tableName} = req.params
         const cols = req.body

         const filesInfo = JSON.parse(cols.filesInfo);
         const colsFiles = {};

         const {files} = req.files;

         Object.keys(filesInfo).forEach(key => {
            colsFiles[key] = []
            for (let i = 0; i < files.length; i++){
               const file = files[i];
               if (filesInfo[key].includes(file.originalname))
                  colsFiles[key].push(file.filename)
            }
         })

         const [[table]] = await db.query(`
            SELECT structure FROM tables WHERE "tableName" = '${tableName}'
         `)

         const {structure} = table

         Object.keys(colsFiles).forEach(col => {

            if (structure[col].type === 'img')
               cols[col] = colsFiles[col][0]
            else{
               const value = JSON.parse(cols[col])
               value.files = colsFiles[col][0]
               cols[col] = JSON.stringify(value);
            }
         })

         delete cols['filesInfo']
         console.log(cols)

         function convertToSql(type, value){
            if(type === 'bool')
               return value

            return `'${value}'`
         }

         let colsSql = ''

         let insert = Object.keys(cols).reduce((acc, col) => {
            const colType = types[structure[col].type]
            colsSql += `${col},`
            const value = convertToSql(colType, cols[col])

            return acc + `${value},`
         }, [])

         insert = insert.substring(0, insert.length - 1);
         colsSql = colsSql.substring(0, colsSql.length - 1);

         const [info] = await db.query(`
            INSERT INTO ${tableName} (${colsSql}) VALUES (${insert})
         `)

         return res.json(info)
      }
      catch (e){
         return res.status(400).json({error: e.message})
      }
   }
   async update(req, res){
      try{
         const {tableName, recordId} = req.params
         const cols = req.body

         const filesInfo = JSON.parse(cols.filesInfo);
         const colsFiles = {};

         const {files} = req.files;

         Object.keys(filesInfo).forEach(key => {
            colsFiles[key] = []
            for (let i = 0; i < files.length; i++){
               const file = files[i];
               if (filesInfo[key].includes(file.originalname))
                  colsFiles[key].push(file.filename)
            }
         })

         Object.keys(colsFiles).forEach(col => {
            cols[col] = colsFiles[col][0]
         })

         delete cols['filesInfo']
         console.log(cols)

         const [[table]] = await db.query(`
            SELECT structure FROM tables WHERE "tableName" = '${tableName}'
         `)

         const {structure} = table
         function convertToSql(type, value){
            if(type === 'bool')
               return value

            return `'${value}'`
         }

         let colsSql = ''

         let update = Object.keys(cols).reduce((acc, col) => {
            const colType = types[structure[col].type]
            const value = convertToSql(colType, cols[col])

            return acc + `${col} = ${value},`
         }, [])

         update = update.substring(0, update.length - 1);
         colsSql = colsSql.substring(0, colsSql.length - 1);

         const [info] = await db.query(`
            UPDATE ${tableName} set ${update}  where id = ${recordId}
         `)

         return res.json({message: 'ok'})
      }
      catch (e){
         return res.status(400).json({error: e.message})
      }
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
}

module.exports = {EntityController: new EntityController()}