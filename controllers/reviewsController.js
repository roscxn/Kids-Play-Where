const Location = require('../models/Location');
const User = require('../models/User')

// const showReview = async (req, res) => {
//   try {
//     const reviews = await Location.find({});
//     console.log("REVIEWS")
//     res.status(200).send(reviews);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// }

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


module.exports = {
    // showReview,
    createReview
}