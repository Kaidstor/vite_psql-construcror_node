const {HtmlGroupModel, HtmlElementModel} = require("../database/models");

class HtmlGroupController {
  async findOne(req, res){
      try{
         const {id} = req.params
         const data = await HtmlGroupModel.findOne({where: {id}, raw: true})
         console.log(data)
         return res.json(data)
      }
      catch(e){
        return res.json({message: e.message})
      }
  }

  async findAll(req, res){
      try{
         const data = await HtmlGroupModel.findAll()
         return res.json(data)
      }
      catch(e){
        return res.json({message: e.message})
      }
  }

  async create(req, res){
      try{
         const {name} = req.body
         const data = await HtmlGroupModel.create({name})
         return res.json(data)
      }
      catch(e){
        return res.json({message: e.message})
      }
  }
  async update(req, res){
      try{
         const {id} = req.params
         const data = await HtmlGroupModel.update({...req.body}, {where: {id}})
         return res.json(data)
      }
      catch(e){
        return res.json({message: e.message})
      }
  }
  async addElement(req, res){
      try{
         const {id} = req.params
         const {elementId} = req.body

         const group = await HtmlGroupModel.findOne({where: {id}, raw: true})
         const element = await HtmlElementModel.findOne({where: {id: elementId}, raw: true})

         const elements = [...(group.elements ? group.elements : []), element]

         const data = await HtmlGroupModel.update({elements}, {where: {id}})
         return res.json(data)
      }
      catch(e){
        return res.json({message: e.message})
      }
  }
}

module.exports = {HtmlGroupController: new HtmlGroupController()}