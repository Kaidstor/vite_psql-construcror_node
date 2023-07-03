const {Router} = require("express");
const router = new Router()
const tableRouter = require("./tableRouter");
const entityRouter = require("./entityRouter");
const htmlElement = require("./htmlElementRouter");
const htmlGroup = require("./htmlGroupRouter");
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use('/table', tableRouter)
router.use('/entity', urlencodedParser, entityRouter)
router.use('/htmlElement', htmlElement)
router.use('/htmlGroup', htmlGroup)

module.exports = router