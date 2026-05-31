# ClubMatrix

### A Collaborative Ecosystem for Student Organizations

ClubMatrix is a full-stack collaboration platform designed to streamline communication, task coordination, event management, and resource sharing across student organizations. The platform provides a secure role-based environment where club activities can be managed efficiently through real-time communication, automated notifications, and AI-assisted collaboration.

---

# 🚀 Key Features

## 🔐 Role-Based Access Control (RBAC)

* JWT-based authentication and authorization
* Three access tiers:

  * Creator
  * Coordinator
  * Member
* Backend-enforced permission checks
* Protected API routes and secure workspace access

## 💬 Real-Time Collaboration

* Socket.IO powered club discussions
* Instant messaging inside club workspaces
* Real-time notifications for tasks, announcements, and events
* Personal notification center

## 📋 Task Management System

* Create and assign tasks to specific members
* Track task lifecycle:

  * Pending
  * In Progress
  * Completed
* Automated completion notifications
* Personalized "My Tasks" dashboard

## 📅 Event Management

* Create and manage club events
* Venue and schedule tracking
* Upcoming events dashboard
* Event updates and notifications

## 📢 Announcements System

* Publish club-wide announcements
* Real-time delivery to members
* Announcement management dashboard

## 📁 Resource Management

* Cloudinary-powered file uploads
* Centralized resource library
* Secure file sharing and retrieval
* Document and media management

## 🤖 AI Assistant

* Integrated workspace AI assistant
* Supports club activities and productivity
* Assists with information retrieval and guidance

---

# 🏗 System Architecture

ClubMatrix follows the MVC (Model-View-Controller) architecture and REST API design principles.

```text
Frontend (React.js)
        │
        ▼
REST APIs (Express.js)
        │
        ▼
Controllers
        │
        ▼
MongoDB Models
```

Real-time communication is handled independently through Socket.IO channels.

---

# ⚙️ Installation & Setup

## Prerequisites

* Node.js (v18+)
* MongoDB Atlas
* Cloudinary Account

## Backend Setup

```bash
cd Backend
npm install
npm run dev
```

## Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

---

# 🔑 Environment Variables

```env
MONGO_URI=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

OPENAI_API_KEY=
```

---

# 📖 API Modules

## Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
```

## Clubs

```text
POST   /api/clubs/create
GET    /api/clubs
GET    /api/clubs/:clubId
POST   /api/clubs/join/:clubId
```

## Announcements

```text
POST   /api/announcements/create/:clubId
GET    /api/announcements/:clubId
PUT    /api/announcements/update/:id
DELETE /api/announcements/delete/:id
```

## Tasks

```text
POST   /api/tasks/create/:clubId
GET    /api/tasks/:clubId
PUT    /api/tasks/status/:taskId
PUT    /api/tasks/update/:taskId
DELETE /api/tasks/delete/:taskId
```

## Events

```text
POST   /api/events/create/:clubId
GET    /api/events/:clubId
PUT    /api/events/update/:eventId
DELETE /api/events/delete/:eventId
```

## Resources

```text
POST   /api/resources/create/:clubId
GET    /api/resources/:clubId
PUT    /api/resources/update/:resourceId
DELETE /api/resources/delete/:resourceId
```

---

# 📁 Project Structure

```text
ClubMatrix/
├── Frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── context/
│   └── socket/
│
├── Backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── config/
│   └── server.js
```

---

# 🛠 Technical Stack

| Layer          | Technologies                         |
| -------------- | ------------------------------------ |
| Frontend       | React.js, Tailwind CSS, React Router |
| Backend        | Node.js, Express.js                  |
| Database       | MongoDB, Mongoose                    |
| Authentication | JWT                                  |
| Real-Time      | Socket.IO                            |
| Storage        | Cloudinary                           |
| AI Integration | OpenAI API                           |
| Deployment     | Render / Vercel                      |

---

# 🔑 Access Matrix

| Feature                    | Member | Coordinator | Creator |
| -------------------------- | :----: | :---------: | :-----: |
| View Announcements         |    ✅   |      ✅      |    ✅    |
| Participate in Discussions |    ✅   |      ✅      |    ✅    |
| Access Resources           |    ✅   |      ✅      |    ✅    |
| Update Assigned Tasks      |    ✅   |      ✅      |    ✅    |
| Create Tasks               |    ❌   |      ✅      |    ✅    |
| Create Events              |    ❌   |      ✅      |    ✅    |
| Create Announcements       |    ❌   |      ✅      |    ✅    |
| Manage Club Members        |    ❌   |      ❌      |    ✅    |
| Edit/Delete Club Content   |    ❌   |      ❌      |    ✅    |

---

# 🏗 Technical Decisions

## Why Socket.IO?

Socket.IO enables real-time communication for discussions and notifications without requiring manual page refreshes, improving collaboration across club members.

## Why Cloudinary?

Cloudinary provides scalable cloud storage for club resources and media files while reducing backend storage overhead.

## Why Role-Based Access Control?

RBAC ensures that sensitive club operations are restricted to authorized users, improving security and maintaining organizational structure.

## Why MVC Architecture?

MVC separates business logic, routes, and data models, making the application easier to maintain, scale, and test.

---

# 📈 Future Enhancements

* AI Meeting Minutes Generator
* Attendance Tracking System
* Analytics Dashboard
* Event Registration System
* Email Notifications
* Mobile Application

---

# 👨‍💻 Author

**Dasari Neelachalam**

B.Tech Computer Science & Engineering

Indian Institute of Engineering Science and Technology (IIEST), Shibpur
