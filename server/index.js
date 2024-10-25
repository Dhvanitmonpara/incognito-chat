import http from "http";
import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import cors from "cors";

if (!dotenv.config({ path: "./.env" })) {
    console.error("⚠️  Error loading .env file");
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.DOMAIN,
        methods: ["GET", "POST"],
        credentials: true,
    },
});

app.use(
    cors({
        origin: process.env.DOMAIN,
        methods: ["GET", "POST"],
        credentials: true,
    })
);

io.on("connection", (socket) => {

    socket.on("message", ({ room, message, sender }) => {
        const messageData = {
            _id: Date.now().toString(),
            message,
            sender
        };

        if (room) {
            io.to(room).emit("receive-message", messageData);
        } else {
            console.error("⚠️  Room not specified for message:", messageData);
        }
    });

    socket.on("join-room", (room) => {
        socket.join(room);
        io.to(room).emit("joined-room", room);
    });

    socket.on("leave-room", ({ room, sender }) => {
        socket.leave(room);
        io.to(room).emit("left-room", {room, sender} );
        io.to(sender).emit("left-room", {room, sender});
    });

    socket.on("disconnect", () => {
        console.log("A user has disconnected:", socket.id);
    });
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
