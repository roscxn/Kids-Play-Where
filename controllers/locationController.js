const Location = require('../models/Location');
const User = require("../models/User");

const showMap = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.json(locations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving locations from database.' });
  }
}

const viewAll = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.status(200).send(locations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const show = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id)
    res.status(200).send(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addBookmark = async (req, res) => {
  const user = await User.findById(req.body._id);
  if (user.bookmarks.find(b => b.toString() === req.params.id)) {
    return res.status(400).json({ message: 'Location has already been added to your Bookmarks' });
  } 
  try {
    const userId = req.body._id; 
    const newBookmark = await User.findByIdAndUpdate(userId, {$push: {"bookmarks" : req.params.id}}).exec();
    return res.status(200).json({ message: 'Location has been added to your Bookmarks.' }); 
  } catch (error) {
    console.log('error:', error);
    return res.status(400).json({ error: error.message });
  }
};

const deleteBookmark = async (req, res) => {
    try {
  const user = await User.findById(req.body._id);
  const userId = req.body._id;
  if (user.bookmarks.find(b => b.toString() == req.params.id)) {
    const deleteBookmark = await User.findByIdAndUpdate(userId, {$pull: {"bookmarks" : req.params.id}}).exec();
      return res.status(201).json({ message: 'Remove bookmark from list' });
  }
  } catch (error) {
    console.log('error:', error);
    return res.status(400).json({ error: error.message });
  }     
};

const addBookmarkCard = async (req, res) => {
    const user = await User.findById(req.body._id);
  if (user.bookmarks.find(b => b.toString() === req.body.locationId)) {
    return res.status(400).json({ message: 'Location has already been added to your Bookmarks' });
  } 
  try {
    const userId = req.body._id; 
    const newBookmark = await User.findByIdAndUpdate(userId, {$push: {"bookmarks" : req.body.locationId}}).exec();
    return res.status(200).json({ message: 'Location has been added to your Bookmarks.' }); 
  } catch (error) {
    console.log('error:', error);
    return res.status(400).json({ error: error.message });
  }
};


const deleteBookmarkCard = async (req, res) => {
    try {
  const user = await User.findById(req.body._id);
  const userId = req.body._id;
  if (user.bookmarks.find(b => b.toString() == req.body.locationId)) {
    const deleteBookmark = await User.findByIdAndUpdate(userId, {$pull: {"bookmarks" : req.body.locationId}}).exec();
      return res.status(201).json({ message: 'Remove bookmark from list' });
  }
  } catch (error) {
    console.log('error:', error);
    return res.status(400).json({ error: error.message });
  }     
  };


module.exports = { 
    showMap,
    viewAll,
    show,
    addBookmark,
    deleteBookmark,
    addBookmarkCard,
    deleteBookmarkCard,

};