const {HtmlElementModel, HtmlGroupModel} = require("../database/models");

class HtmlElementController {
  async findOne(req, res){
      try{
         const {id} = req.params
         const data = await HtmlElementModel.findOne({where: {id}, raw: true})
         return res.json(data)
      }
      catch(e){
        return res.json({message: e.message})
      }
  }

  async findAll(req, res){
      try{
         const data = await HtmlElementModel.findAll()
         return res.json(data)
      }
      catch(e){
        return res.json({message: e.message})
      }
  }

   async create(req, res){
      try{
         const {name} = req.body

         const data = await HtmlElementModel.create({name})
         return res.json(data)
      }
      catch(e){
         return res.json({message: e.message})
      }
   }
   async update(req, res){
      try{
         const {id} = req.params
         const data = await HtmlElementModel.update({where: {id}},{...req.body})
         return res.json(data)
      }
      catch(e){
         return res.json({message: e.message})
      }
   }
}

module.exports = {HtmlElementController: new HtmlElementController()}