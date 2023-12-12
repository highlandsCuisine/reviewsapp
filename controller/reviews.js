const { trycatch } = require('../helper/tryCatch');
const { ErrorHandler } = require('../helper/errorHandler');
const {
  storeRestaurant,
  allRestaurants,
  updateReviews,
  perResReviews,
} = require('../database/reviews/reviews');
const Restaurants = require('../model/restaurant');

exports.storeRestaurants = trycatch(async (req, res, next) => {
  const { name, link } = await req.body;
  fetch(`${link}`)
    .then((response) => response.json())
    .then((response) => {
      const { reviews } = response.result;
      const fiveStarReviews = reviews.filter((review) => review.rating === 5);
      if (!reviews) {
        return next(new ErrorHandler(500, 'Error while fetching reviews'));
      }
      const rest = new Restaurants(name, link, fiveStarReviews);
      const store = storeRestaurant(rest);
      if (!store) {
        return next(new ErrorHandler(500, 'Error while storing reviews'));
      }
      return res.status(200).json({
        success: true,
        message: 'Restaurants stored successfully!',
      });
    });
});

exports.readRestaurants = trycatch(async (req, res, next) => {
  const store = await allRestaurants();
  if (!store) {
    return next(new ErrorHandler(500, 'Error while fetching restaurants'));
  }
  return res.status(200).json({
    success: true,
    reviews: store,
    message: 'Restaurants fetched!',
  });
});

exports.updateRestaurants = trycatch(async (req, res, next) => {
  const { name, link, id } = await req.body;
  fetch(`${link}`)
    .then((response) => response.json())
    .then((response) => {
      const { reviews } = response.result;
      const fiveStarReviews = reviews.filter((review) => review.rating === 5);
      if (!reviews) {
        return next(new ErrorHandler(500, 'Error while fetching reviews'));
      }
      const rest = new Restaurants(name, link, fiveStarReviews);
      const store = updateReviews(rest, id);
      if (!store) {
        return next(new ErrorHandler(500, 'Error while storing reviews'));
      }
      return res.status(200).json({
        success: true,
        message: 'Restaurants updated successfully!',
      });
    });
});

exports.readPerRestaurants = trycatch(async (req, res, next) => {
  const { id } = await req.params;
  const store = await perResReviews(id);
  if (!store) {
    return next(new ErrorHandler(500, 'Error while fetching restaurants'));
  }
  return res.status(200).json({
    success: true,
    data: store,
    message: 'Restaurants fetched!',
  });
});
