require('dotenv').config();

module.exports = {

  /**
   * App environment
   * */

  NODE_ENV: process.env.NODE_ENV,

  /**
   * Application Port
   *
   * This value is the port of the application. This value is used to instruct
   * the HTTP server to direct the incoming traffic to your application.
   */
  PORT: process.env.PORT || 3000,

  /**
   * JSON Web Token Secret
   *
   * JWT or JSON Web Token is a JSON-based open standard for creating access
   * tokens that may assert some claims i.e. user authentication and/or
   * authorization. This value stores the secret salt to be used to generate
   * the access tokens.
   * https://www.npmjs.com/package/jsonwebtoken
   */
  JWT_SECRET: process.env.JWT_SECRET || 'a long random string',
  /**
   * Default Database Connection
   *
   * This value specifies the database connection to be used by the application
   * for all database work.
   */
  DB_DATABASE: process.env.DB_DATABASE || 'mongodb://localhost:27017/chat_db',

  TEST_DB: 'mongodb://localhost:27017/chat_test_db',

  DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/chat_app_db',

  /**
   * Salt rounds required for hashing passwords using bcrypt library.
   * https://www.npmjs.com/package/bcrypt
   */
  BCRYPT_SALT_ROUNDS: 12,

  RESET_PASSWORD_EXPIRATION_TIME_IN_MILLISECONDS: process.env.RESET_PASSWORD_EXPIRATION_TIME_IN_MILLISECONDS ||
    3600000,

  PER_PAGE: process.env.PER_PAGE || 50,
};
