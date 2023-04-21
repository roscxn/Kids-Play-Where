const express = require("express");
const reviewsController = require("../controllers/reviewsController");
const router = express.Router();

// router.get('/:id', reviewsController, showReview)
router.post('/:id', reviewsController.createReview)



module.exports = router;