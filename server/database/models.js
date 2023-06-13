const { DataTypes } = require('sequelize')
const {db} = require("./db");

const Table = db.define('table', {
   id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
   name: DataTypes.STRING,
   dbName: DataTypes.STRING,
   structure: {type: DataTypes.JSONB, defaultValue: null},
}, {timestamps: false})

module.exports = {
   TableModel: Table,
   // ColumnTypesModel: ColumnTypes
}