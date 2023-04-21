const express = require("express");
const reviewsController = require("../controllers/reviewsController");
const router = express.Router();

router.post('/:id', reviewsController.createReview)
router.get('/location/:id/reviews', reviewsController.showReviews);


module.exports = router;