const express = require("express");
const reviewsController = require("../controllers/reviewsController");
const router = express.Router();

router.post('/:id', reviewsController.createReview)
router.delete('/:reviewId', reviewsController.deleteReview)

module.exports = router;