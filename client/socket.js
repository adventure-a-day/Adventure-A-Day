import io from "socket.io-client"
import store, { gotNewMessage } from "./store"

const socket = io(window.location.origin)

socket.on("connect", () => {
  socket.on("new-message", message => {
    store.dispatch(gotNewMessage(message))
  })
})

export default socket
