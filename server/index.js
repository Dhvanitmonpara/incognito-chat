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
})

const port = process.env.PORT
server.listen(port, () => {
    console.log(`Server is listening to port ${port}`)
})