type Message = {
  _id: string;
  message: string;
  sender: string;
  username: string;
};

type ActiveUser = {
  id: string;
  username: string;
};

type Room = {
  roomName: string;
  chat: Message[];         // Array of messages
  activeUsers: ActiveUser[]; // Array of active users in the room
};

export type { Message, ActiveUser, Room };