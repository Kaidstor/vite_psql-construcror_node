const {Router} = require("express");
const {HtmlElementController} = require("../controller/htmlElementController");
const router = new Router()

router.get('/', HtmlElementController.findAll)
router.get('/:id', HtmlElementController.findOne)
router.post('/', HtmlElementController.create)
router.post('/:id', HtmlElementController.update)

module.exports = router