const bcrypt = require('bcrypt')
const constants = require('../config/constants')

exports.hashPassword = async (password) => {
  return  bcrypt.hashSync(password, constants.BCRYPT_SALT_ROUNDS);
}

exports.compare = async (plainPassword, hash) => {
  return bcrypt.compare(plainPassword, hash)
}