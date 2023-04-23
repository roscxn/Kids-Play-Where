const express = require("express");
const locationController = require('../controllers/locationController')
const router = express.Router();

router.get('/', locationController.showMap);
router.get('/viewall', locationController.viewAll);
router.get('/:id', locationController.show);
router.post('/:id/addBookmark', locationController.addBookmark)
router.delete('/:id/addBookmark', locationController.deleteBookmark)

module.exports = router;