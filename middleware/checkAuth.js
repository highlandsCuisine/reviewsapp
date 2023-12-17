const { isAuth } = require('../database/auth/auth');
const { trycatch } = require('../helper/tryCatch');

exports.isAuthenticated = trycatch(async (req, res, next) => {
  const token = await req.session.user;

  if (!token) {
    return res.redirect('/admin/dvls/googlereviews/login');
  }

  const verifyTokens = await isAuth(token.act);

  if (!verifyTokens) {
    return res.redirect('/admin/dvls/googlereviews/login');
  }
  return true && next();
});
