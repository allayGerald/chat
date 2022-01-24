const express = require('express')
const path = require('path')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoDBStore = require('connect-mongodb-session')(session)

const constants = require('./config/constants.js')
const authController = require('./controllers/auth')
const feedController = require('./controllers/feed')
const { isLoggedIn } = require('./middlewares/auth')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.set('view engine', 'ejs')

// const MongoDBStore = connectMongoDBSession(session)
const store = new MongoDBStore({
  uri: constants.DB_DATABASE,
  collection: 'sessions'
})

app.use(session({
  secret: constants.JWT_SECRET,
  cookie: {
    maxAge: 269999999999
  },
  store: store,
  resave: false,
  saveUninitialized: true,
}))

mongoose.connect(constants.DB_DATABASE)


app.get('/', (req, res) => {
  res.render('login', )
})
app.post('/login', authController.login)

app.get('/register', (req, res) => {
  res.render('register', )
})

app.post('/register', authController.register)

app.get('/feed', [isLoggedIn], feedController.list)
app.post('/feed', [isLoggedIn],  feedController.store)

const server = app.listen(constants.PORT)
const io = require('./socket').init(server)

io.sockets.on('connection', (socket) => {
// TODO GET CURRENT ONLINE USERS

  socket.on('disconnect', () => {
 const today = new Date().toLocaleString('en-TZ', { timeZone: 'Africa/Nairobi' })
    const time = today.split(', ')[1]

    io.emit('message', {
      message: `A user has left a chat`,
      user: 'Chat Bot',
      time
    })
  })
})



