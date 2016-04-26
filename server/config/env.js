module.exports = {
  'session_secret': process.env.SESSION_SECRET || 'dev-secret',
  'port': process.env.SIGNIN_PROD_PORT || 3000,
  'db_url': process.env.SIGNIN_PROD_DB_URL || 'mongodb://localhost/betterco'
};