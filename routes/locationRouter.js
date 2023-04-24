const express = require("express");
const locationController = require('../controllers/locationController')
const router = express.Router();

router.get('/', locationController.showMap);
router.get('/viewall', locationController.viewAll);
router.get('/:id', locationController.show);
router.post('/:id/addBookmark', locationController.addBookmark)
router.delete('/:id/addBookmark', locationController.deleteBookmark)
router.post("/locationcard/addBookmarkCard", locationController.addBookmarkCard);
router.delete("/locationcard/addBookmarkCard", locationController.deleteBookmarkCard);


module.exports = router;