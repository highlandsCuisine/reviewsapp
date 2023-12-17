const express = require('express');
const {
  createNewUser,
  signInUser,
  resetLink,
  signOutUser,
} = require('../controller/userController');

const router = express.Router();

router.post('/signin', signInUser);
router.post('/reset/password', resetLink);
router.post('/create', createNewUser);
router.get('/signout', signOutUser);

module.exports = router;
