const express = require("express");
const locationController = require("../controllers/locationcontroller");
const router = express.Router();

router.get('/', locationController.showMap);
router.get('/viewall', locationController.viewAll);

module.exports = router;