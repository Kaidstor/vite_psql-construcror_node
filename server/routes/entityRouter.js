const {Router} = require("express");
const {EntityController} = require("../controller/entityController");
const router = new Router()
const uuid = require('uuid')

const multer  = require("multer");
const path = require("path");

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'uploads/')
   },
   filename: function (req, file, cb) {
      cb(null, uuid.v4() + path.extname(file.originalname)) //Appending extension
   }
})

const upload = multer({storage: storage});

router.get('/:tableName', EntityController.findAll)
router.post('/:tableName', upload.fields([{name: 'files', maxCount: 10}]), EntityController.add)
router.post('/:tableName/:recordId', upload.fields([{name: 'files', maxCount: 10}]), EntityController.update)

module.exports = router