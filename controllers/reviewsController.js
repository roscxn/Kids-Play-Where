const Location = require('../models/Location');
const User = require('../models/User')

const createReview = async (req, res) => {
  const user = await User.findOne(req.body.user)
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { content, rating } = req.body;    
    const location = await Location.findById(req.params.id);
    try {
      if (!location) {
        return res.status(404).json({ error: "Location not found" });
      }
      const review = {
        userName: user.name,
        content,
        rating
      };
      location.reviews.push(review);
      await location.save();
      return res.status(201).json(review);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
};

const showReviews = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).send('Location not found');
    }
    const reviews = { ...location.reviews };
    res.status(200).send(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



module.exports = {
    createReview,
    showReviews
}