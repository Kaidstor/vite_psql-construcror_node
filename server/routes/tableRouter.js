const {Router} = require("express");
const {TableController} = require("../controller/tableController");

const router = new Router()

// { label: 'The Godfather', id: 1 },


router.get('/', TableController.findAll)
router.get('/:id', TableController.findOne)


router.post('/add', TableController.add)
router.post('/:id', TableController.save)
router.post('/:id/remove', TableController.remove)

module.exports = router