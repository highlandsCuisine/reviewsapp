const express = require('express');
const {
  storeRestaurants,
  readRestaurants,
  readPerRestaurants,
  updateRestaurants,
} = require('../controller/reviews');

const router = express.Router();

router.post('/restaurants/create', storeRestaurants);

router.get('/restaurants/read', readRestaurants);

router.get('/restaurants/read/:id', readPerRestaurants);

router.post('/restaurants/update', updateRestaurants);

module.exports = router;
