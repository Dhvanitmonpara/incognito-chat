import http from "http";
import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const result = dotenv.config({ path: "./.env" });
if (result.error) {
    console.error("⚠️  Error loading .env file:", result.error);
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

const rooms = {};

io.on("connection", (socket) => {
    // Handle message event
    socket.on("message", ({ room, message, sender, username }) => {
        const messageData = {
            _id: uuidv4(),
            message,
            sender,
            username,
        };

        if (room && rooms[room]) {
            rooms[room].chat.push(messageData);
            io.to(room).emit("receive-message", messageData);
        } else {
            console.error("⚠️  Room not specified or does not exist for message:", messageData);
        }
    });

    // Handle join-room event
    socket.on("join-room", ({ room, username, socketId }) => {
        socket.join(room);
        rooms[room] = rooms[room] || { roomName: room, chat: [], activeUsers: [] };

        // Add user to active users in the room
        rooms[room].activeUsers.push({ id: socketId, username });

        // Emit the updated room data to clients
        io.to(room).emit("joined-room", { room: rooms[room], username, socketId });
    });

    // Handle leave-room event
    socket.on("leave-room", ({ room, socketId, username }) => {
        socket.leave(room);

        if (rooms[room]) {
            rooms[room].activeUsers = rooms[room].activeUsers.filter(user => user.id !== socketId);

            // Emit the updated room data to clients
            io.to(room).emit("left-room", { room: rooms[room], username });
            io.to(socketId).emit("left-room", { room: null, username });

            // Remove room if empty
            if (rooms[room].activeUsers.length === 0) {
                delete rooms[room];
            }
        }
    });

    // Handle disconnect event
    socket.on("disconnect", () => {
        for (const roomId in rooms) {
            rooms[roomId].activeUsers = rooms[roomId].activeUsers.filter(user => user.id !== socket.id);

            // Emit the updated list of active users
            io.to(roomId).emit("room-users", rooms[roomId]);

            // Clean up room if empty
            if (rooms[roomId].activeUsers.length === 0) {
                delete rooms[roomId];
            }
        }
    });
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
