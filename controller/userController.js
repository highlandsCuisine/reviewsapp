const ejs = require('ejs');
const User = require('../model/user');
const sendEmail = require('../helper/sendEmail');
const { trycatch } = require('../helper/tryCatch');
const { ErrorHandler } = require('../helper/errorHandler');
const {
  createUser,
  emailVerificationLink,
  signInExistingUser,
  resetPassword,
  signOut,
} = require('../database/auth/auth');
const UserRes = require('../model/userRes');

const createNewUser = trycatch(async (req, res, next) => {
  const { email, username, password, phone } = await req.body;
  const newUser = new User(username, email, password, phone);
  console.log(newUser);
  const createdUser = await createUser(newUser);

  if (!createdUser) {
    return next(new ErrorHandler(500));
  }
  const emailLink = await emailVerificationLink(email);
  const data = await ejs.renderFile('views/email/verificationEmail.ejs', {
    emailLink,
    username,
  });
  sendEmail({
    to: email,
    subject: 'Verify Your Email!',
    html: data,
  });
  return res.status(201).json({
    success: true,
    message: 'Check your email for verification!',
  });
});

const signInUser = trycatch(async (req, res, next) => {
  const { email, password } = await req.body;
  const existingUser = await signInExistingUser(email, password);
  if (!existingUser) {
    return next(new ErrorHandler(500, 'Error Missing credentials!'));
  }
  if (!existingUser.user.emailVerified) {
    return next(new ErrorHandler(500, 'Please Verify Your Email!'));
  }
  const userRes = new UserRes(
    existingUser.user.displayName,
    existingUser.user.email,
    existingUser.user.emailVerified,
    existingUser.user.phoneNumber,
    existingUser.user.stsTokenManager.accessToken
  );
  req.session.user = {
    act: userRes.accessToken,
    uid: userRes.email,
    email: userRes.email,
    name: userRes.displayName,
    phone: userRes.phoneNumber,
  };
  return res.status(200).json({
    success: true,
    message: 'Logged-In successfully!',
  });
});

const signOutUser = trycatch(async (req, res, next) => {
  await req.session.destroy();
  const x = await signOut();
  if (!x) {
    return res.status(400).json({
      success: true,
      message: 'Error while logging out!',
    });
  }
  return res.redirect('/admin/dvls/googlereviews/login');
});

const resetLink = trycatch(async (req, res, next) => {
  const { email } = await req.body;
  const resetPasswordLink = await resetPassword(email);
  if (!resetPasswordLink) {
    return next(new ErrorHandler(500));
  }
  const data = await ejs.renderFile('views/email/passwordReset.ejs', {
    resetPasswordLink,
  });
  sendEmail({
    to: email,
    subject: 'Password Reset!',
    html: data,
  });
  return res.status(201).json({
    success: true,
    message: 'Password Reset Link has been sent to your email!',
  });
});

module.exports = { createNewUser, signInUser, resetLink, signOutUser };
