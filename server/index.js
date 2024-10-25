import http from "http"
import express from "express"
import dotenv from "dotenv"
import { Server } from "socket.io"
import cors from "cors"

dotenv.config({
    path: "./.env"
})

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
})

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}))

io.on("connection", (socket) => {
    console.log("A new user had connected", socket.id)

    socket.on("message", ({ room, message, sender }) => {
        // socket.broadcast.emit(message) // sends all users except the sender
        // io.emit(message) // io means all connected users (entire circuit)
        io.to(room).emit("receive-message", { _id: Date.now().toString(), message, sender, timestamp: Date.now().toString() }) // room or an array of rooms
        // socket.broadcast.emit("receive-message", { _id: Date.now().toString(), message, sender, timestamp: Date.now() }) // room or an array of rooms
    })

    socket.on("join-room", (room) => {
        socket.join(room)
        io.to(room).emit("joined-room", room)
    })

    socket.on("leave-room", (room) => {
        socket.leave(room)
        io.to(room).emit("left-room", room)
    })

    socket.on("disconnect", () => {
        console.log("A user had disconnected")
    })
})

const port = process.env.PORT || 8000
server.listen(port, () => {
    console.log(`Server is listening to port ${port}`)
})