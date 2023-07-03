const userService = require('../service/userService')
const ApiError = require('../error/ApiError')
const {User} = require("../models/models");
const {validationResult} = require('express-validator')

class UserController {
  async login(req, res, next) {
   try{
      const {email, password} = req.body
      const userData = await userService.login(email, password)

      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData)
   }
   catch (e) {
      next(e)
   }
  }
  async logout(req, res, next){
     try{
        const {refreshToken} = req.cookies;
        const token = await userService.logout(refreshToken)

        res.clearCookie('refreshToken')
        return res.json(token)
     }
     catch (e) {
        next(e)
     }
  }
  async registration(req, res, next) {
   try{
      const errors = validationResult(req)
      if(!errors.isEmpty())
         throw ApiError.badRequest('Ошибка при валидации', errors.array())

      const {email, password} = req.body

      const candidate = await User.findOne({where:{email}})
      if (candidate)
         throw ApiError.badRequest('Пользователь с данным почтовым адресом существует')

      const userData = await userService.registration(email, password)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData)
   }
   catch (e) {
      next(e)
   }
  }
  async refresh(req, res, next) {
   try{
      const {refreshToken} = req.cookies;

      const userData = await userService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData)
   }
   catch (e) {
      next(e)
   }
  }
}

module.exports = new UserController()