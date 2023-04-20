const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/signup', usersController.create);
router.post("/login", usersController.login);
router.get("/:id/bookmarks", usersController.showBookmarks);

module.exports = router;