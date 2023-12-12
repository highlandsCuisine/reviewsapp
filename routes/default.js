const express = require('express');
const { allRestaurants } = require('../database/reviews/reviews');
const { ErrorHandler } = require('../helper/errorHandler');

const router = express.Router();

router.get('/adminpannel', async (req, res, next) => {
  const data = await allRestaurants();
  console.log(data);
  if (!data) {
    return next(new ErrorHandler(500, 'Error while fetching data!'));
  }
  return res.render('index', {
    data,
  });
});

module.exports = router;
