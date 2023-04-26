const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../config/checkToken')

router.post('/signup', usersController.create);
router.post("/login", usersController.login);
router.get("/:id/bookmarks", authMiddleware, usersController.showBookmarks);

module.exports = router;