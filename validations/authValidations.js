const { checkSchema } = require('express-validator');

// User Registration validation
exports.userRegisterValidator = checkSchema({
  username: {
    exists: {
      errorMessage: 'UserName is required.',
      options: { checkFalsy: true },
    },
    isString: { errorMessage: 'UserName should be string.' },
    isLength: {
      options: { min: 3, max: 24 },
      errorMessage: 'UserName should be between 3-24 characters.',
    },
  },
  email: {
    isEmail: { errorMessage: 'Please provide valid email.' },
  },
  password: {
    exists: { errorMessage: 'Password is required.' },
    isString: { errorMessage: 'Password should be string.' },
    isLength: {
      options: { min: 6, max: 50 },
      errorMessage: 'Password should be between 6-50 characters.',
    },
  },
});

// User Login validation
exports.userLoginValidator = checkSchema({
  email: {
    isEmail: { errorMessage: 'Please provide valid email.' },
  },
  password: {
    exists: { errorMessage: 'Password is required.' },
    isString: { errorMessage: 'Password should be string.' },
    isLength: {
      options: { min: 5, max: 50 },
      errorMessage: 'Password should be between 6-50 characters.',
    },
  },
});
