import { io } from 'socket.io-client'
import './App.css'

function App() {
  const socket = io("http://localhost:8001")
  console.log(socket)
  return (
    <>
      <h1>HEllo</h1>
    </>
  )
}

export default App
