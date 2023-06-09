const express = require("express");
const locationController = require('../controllers/locationController')
const router = express.Router();
const authMiddleware = require('../config/checkToken')

router.get('/', locationController.showMap);
router.get('/viewall', locationController.viewAll);
router.get('/:id', locationController.show);
router.post('/:id/addBookmark', authMiddleware, locationController.addBookmark)
router.delete('/:id/addBookmark', authMiddleware, locationController.deleteBookmark)
router.post("/locationcard/addBookmarkCard", authMiddleware, locationController.addBookmarkCard);
router.delete("/locationcard/addBookmarkCard", authMiddleware, locationController.deleteBookmarkCard);

module.exports = router;