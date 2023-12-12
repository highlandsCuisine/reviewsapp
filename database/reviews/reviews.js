const { db } = require('../connection');

const storeRestaurant = (res) => {
  const newRest = db.ref('restaurants').push(res);
  return newRest;
};

const allRestaurants = async () => {
  const readRestaurants = await db.ref('restaurants').once('value');
  const documents = [];
  readRestaurants.forEach((childSnapshot) => {
    const id = childSnapshot.key;
    const data = childSnapshot.val();
    documents.push({ id, data });
  });
  return documents;
};

const createReviews = (reviews) => {
  const newReviews = db.ref('reviews').push(reviews);
  return newReviews;
};

const perResReviews = async (rid) => {
  const readReviews = await db.ref(`restaurants/${rid}`).once('value');
  return readReviews;
};

const updateReviews = async (review, id) => {
  const newReviews = await db.ref(`restaurants/${id}`).once('value');
  if (newReviews.exists()) {
    await newReviews.ref.set(review);
    return review;
  }
  return null;
};

module.exports = {
  createReviews,
  perResReviews,
  updateReviews,
  storeRestaurant,
  allRestaurants,
};
