const express = require('express');
const { allRestaurants } = require('../database/reviews/reviews');
const { ErrorHandler } = require('../helper/errorHandler');
const { isAuthenticated } = require('../middleware/checkAuth');

const router = express.Router();

router.get('/', async (req, res, next) => res.send('OK, Please wait...'));

router.get('/admin/dvls/googlereviews/login', async (req, res, next) =>
  res.render('login')
);

router.get('/adminpannel', isAuthenticated, async (req, res, next) => {
  const data = await allRestaurants();
  if (!data) {
    return next(new ErrorHandler(500, 'Error while fetching data!'));
  }
  return res.render('index', {
    data,
  });
});

module.exports = router;
