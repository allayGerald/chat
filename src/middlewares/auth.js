const io = require('../socket')

exports.isLoggedIn = (req, res, next) => {
  if (!req.session.userName) {
    return res.redirect('/?not')
  }

  req.io = io.getIO()

  next()
}