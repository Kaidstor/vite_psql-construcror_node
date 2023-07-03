const { DataTypes } = require('sequelize')
const {db} = require("./db");

const Table = db.define('table', {
   id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
   name: DataTypes.STRING,
   tableName: DataTypes.STRING,
   structure: {type: DataTypes.JSONB, defaultValue: null},
}, {timestamps: false})

const HtmlElement = db.define('htmlElement', {
   id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
   name: {type: DataTypes.STRING, defaultValue: ''},
   html: DataTypes.TEXT,
   coords: DataTypes.JSONB
})

const HtmlGroup = db.define('htmlGroup', {
   id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
   name: DataTypes.STRING,
   bkgImg: DataTypes.STRING,
   size: DataTypes.JSONB,
   elements: DataTypes.JSONB,
   coords: DataTypes.JSONB
})

module.exports = {
   TableModel: Table,
   HtmlElementModel: HtmlElement,
   HtmlGroupModel: HtmlGroup,
   // ColumnTypesModel: ColumnTypes
}