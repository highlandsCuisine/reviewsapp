const admin = require('firebase-admin');
const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');

const clientAccount = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: 'highlandcuisine001',
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENTID,
};

const serviceAccount = {
  type: 'service_account',
  project_id: 'highlandcuisine001',
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER,
  client_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_URL,
  universe_domain: process.env.FIREBASE_UNIVERSAL_URL,
};
// client initialization
const app = initializeApp(clientAccount);
// Admin initialization
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
// Admin auth
const auth = admin.auth();
// Client auth
const clientAuth = getAuth(app);
// Database Connection
const db = admin.database();
console.log('☘️  DataBase Connection Success');

module.exports = { admin, auth, db, clientAuth };
