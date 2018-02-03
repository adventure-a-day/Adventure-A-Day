module.exports = io => {
  io.on("connection", socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    let currentRoom

    socket.on("room", room => {
      if (currentRoom) socket.leave(currentRoom)
      currentRoom = room
      socket.join(room)
    })
    socket.on("new-message", message => {
      socket.to(currentRoom).emit("new-message", message)
    })

    socket.on("disconnect", () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
