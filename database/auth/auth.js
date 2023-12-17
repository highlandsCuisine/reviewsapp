const { signInWithEmailAndPassword } = require('firebase/auth');
const { auth, clientAuth } = require('../connection');

const createUser = async (credentials) => {
  const user = await auth.createUser(credentials);
  return user;
};

const signInExistingUser = async (email, password) => {
  const user = await signInWithEmailAndPassword(clientAuth, email, password);
  return user;
};

const resetPassword = async (email) => {
  const resetLink = await auth.generatePasswordResetLink(email);
  const r = resetLink.split('apiKey=');
  const makeLink = `${r[0]}apiKey=${process.env.FIREBASE_APIKEY}`;
  return makeLink;
};

const isAuth = async (token) => {
  const isAuthenticated = await auth.verifyIdToken(token);
  return isAuthenticated;
};

const emailVerificationLink = async (email) => {
  const link = await auth.generateEmailVerificationLink(email);
  const r = link.split('apiKey=');
  const makeLink = `${r[0]}apiKey=${process.env.FIREBASE_APIKEY}`;
  return makeLink;
};

const signOut = async () => {
  const user = await clientAuth
    .signOut()
    .then((r) => {
      return true;
    })
    .catch((e) => {
      return false;
    });
  return user;
};

module.exports = {
  isAuth,
  signOut,
  createUser,
  resetPassword,
  signInExistingUser,
  emailVerificationLink,
};
