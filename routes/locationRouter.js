const express = require("express");
const locationController = require("../controllers/locationcontroller");
const router = express.Router();

router.get('/', locationController.showMap);
router.get('/viewall', locationController.viewAll);
router.get('/:id', locationController.show);
router.post('/:id/addBookmark', locationController.addBookmark)
router.delete('/:id/addBookmark', locationController.deleteBookmark)
// router.post("/locationcard/addBookmark", locationController.addBookmarkCard);
// router.delete("/locationcard/addBookmark", locationController.deleteBookmarkCard);

module.exports = router;