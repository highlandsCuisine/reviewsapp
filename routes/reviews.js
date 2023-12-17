const express = require('express');
const {
  storeRestaurants,
  readRestaurants,
  readPerRestaurants,
  updateRestaurants,
} = require('../controller/reviews');
const { isAuthenticated } = require('../middleware/checkAuth');

const router = express.Router();

router.post('/restaurants/create', isAuthenticated, storeRestaurants);

router.get('/restaurants/read', isAuthenticated, readRestaurants);

router.post('/restaurants/update', isAuthenticated, updateRestaurants);
// Not protected
router.get('/restaurants/read/:id', readPerRestaurants);

module.exports = router;
