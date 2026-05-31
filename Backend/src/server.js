const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const http = require("http");

const { Server } = require("socket.io");

require("dotenv").config();

// ROUTES


const authRoutes = require(
  "./routes/auth.routes"
);

const clubRoutes = require(
  "./routes/club.routes"
);

const announcementRoutes = require(
  "./routes/announcement.routes"
);
const chatRoutes = require(
  "./routes/chat.routes"
);
const taskRoutes = require(
  "./routes/task.routes"
);
const eventRoutes = require(
  "./routes/event.routes"
);

const resourceRoutes = require(
  "./routes/resource.routes"
);

const notificationRoutes =
require(
  "./routes/notification.routes"
);
const aiRoutes = require(
  "./routes/ai.routes"
);
const socketHandler = require(
  "./sockets/socket"
);



const app = express();

// MIDDLEWARES

app.use(cors());

app.use(express.json());

// API ROUTES

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/clubs",
  clubRoutes
);

app.use(
  "/api/announcements",
  announcementRoutes
);
app.use(
  "/api/chat",
  chatRoutes
);
app.use(
  "/api/tasks",
  taskRoutes
);
app.use(
  "/api/events",
  eventRoutes
);
app.use(
  "/api/resources",
  resourceRoutes
);
app.use(
  "/api/notifications",
  notificationRoutes


);
app.use(
  "/api/ai",
  aiRoutes
);



// TEST ROUTE

app.get("/", (req, res) => {

  res.send("API Running");

});

// DATABASE CONNECTION

mongoose.connect(
  process.env.MONGO_URI
)

.then(() => {

  console.log(
    "MongoDB Connected"
  );

})

.catch((err) => {

  console.log(err);

});

// PORT

const PORT =
  process.env.PORT || 5000;

// CREATE HTTP SERVER

const server =
  http.createServer(app);

// SOCKET SERVER

const io = new Server(server, {

  cors: {

    origin:
      "http://localhost:5173",

    methods: [
      "GET",
      "POST"
    ]

  }

});
app.set("io",io);

// PASS io TO SOCKET HANDLER

socketHandler(io);

// START SERVER

server.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );



});