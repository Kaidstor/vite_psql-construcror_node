const {Router} = require("express");
const {HtmlGroupController} = require("../controller/htmlGroupController");
const router = new Router()

router.get('/', HtmlGroupController.findAll)
router.get('/:id', HtmlGroupController.findOne)
router.post('/', HtmlGroupController.create)
router.post('/:id', HtmlGroupController.update)
router.post('/:id/addElement', HtmlGroupController.addElement)

module.exports = router