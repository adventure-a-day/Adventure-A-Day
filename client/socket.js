import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', (message) => {
  console.log('Connected!')
  socket.on('new-message', message => {
  	new Notification(message)
  	//const notification = new Notification(message)
  	console.log("new message: ", message)
  })
})

export default socket
