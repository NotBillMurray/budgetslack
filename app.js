module.exports = function () {
  const express = require('express')
  const mongoose = require('mongoose')
  const morgan = require('morgan')
  const AuthController = require('./controllers/auth')
  const MessageController = require('./controllers/messages')
  const SocketController = require('./controllers/socket-events')
  const path = require('path')
  const app = express()

  app.use(express.static('static'))
  app.use(express.json())
  app.use(morgan('tiny'))

  app.use('/', AuthController)
  app.use('/', MessageController)

  const http = require('http').createServer(app)
  const io = require('socket.io')(http)

  app.use(express.static(path.join(__dirname, 'client-react/build')))
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client-react/build', 'index.html'))
  })

  io.on('connection', SocketController(io))

  const connectDatabase = async (databaseName = 'chatroom', hostname = 'localhost') => {
    const database = await mongoose.connect(
      process.env.MONGODB_URI || `mongodb://${hostname}/${databaseName}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    )

    console.log(`Database connected at mongodb://${hostname}/${databaseName}...`)

    return database
  }

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client-react/build'))
  }

  const startServer = port => {
    http.listen(port, async () => {
      await connectDatabase()
      console.log(`Server listening on port ${port}...`)
    })
  }

  return startServer
}
