const io = require('socket.io')(5000, {
  cors: {
    origin: "https://3000-beige-takin-qow51yl5.ws-eu03.gitpod.io",
    methods: ["GET", "POST"]
  }
})

io.on('connection', socket => {
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient)
      newRecipients.push(id)
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text
      })
    })
  })
})