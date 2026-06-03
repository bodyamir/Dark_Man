# NEXORA - AI-Powered Social Media Platform - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 14+
- Redis 7+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/bodyamir/Dark_Man.git
cd Dark_Man

# 2. Setup environment variables
cp .env.example .env.local

# 3. Start services with Docker Compose
docker-compose up -d

# 4. Install backend dependencies
cd backend
npm install

# 5. Install frontend dependencies
cd ../frontend
npm install

# 6. Start backend (from backend directory)
npm run start:dev

# 7. Start frontend (from frontend directory)
npm run dev
```

### Access URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Docs**: http://localhost:3001/api/docs
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379
- **MinIO Console**: http://localhost:9001

---

## 📁 Project Structure

```
nexora/
├── backend/              # NestJS Backend
│   ├── src/
│   │   ├── auth/        # Authentication
│   │   ├── users/       # Users Management
│   │   ├── posts/       # Posts & Feed
│   │   ├── messages/    # Messaging
│   │   ├── communities/ # Communities
│   │   ├── notifications/ # Notifications
│   │   ├── ai/          # AI/NEX Services
│   │   ├── admin/       # Admin Dashboard
│   │   └── app.module.ts
│   ├── package.json
│   └── Dockerfile
│
├── frontend/            # Next.js Frontend
│   ├── src/
│   │   ├── app/        # Pages
│   │   ├── components/ # React Components
│   │   ├── services/   # API Services
│   │   ├── store/      # State Management
│   │   └── styles/     # Styles
│   ├── package.json
│   └── tailwind.config.js
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🔑 Default Credentials

### Environment Variables

Create `.env.local` file with:

```env
NODE_ENV=production
PORT=3001

DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=nexora
DATABASE_USER=nexora_user
DATABASE_PASSWORD=nexora_secure_password_2024

REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=nexora_redis_password

JWT_SECRET=your_jwt_secret_key_change_in_production_2024
JWT_REFRESH_SECRET=your_jwt_refresh_secret_change_in_production_2024

MINIO_HOST=minio
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin_secure_password_2024

OPENAI_API_KEY=sk-your_openai_api_key_here

CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

---

## 🎯 Core Features Implemented

### ✅ Authentication
- Email/Password Registration
- Login with JWT tokens
- 2FA Support
- Email Verification
- Password Reset

### ✅ Social Features
- Create, Edit, Delete Posts
- Like/Unlike Posts
- Comments System
- Share Posts
- User Profiles
- Follow/Unfollow Users

### ✅ Messaging
- Send Direct Messages
- Message Conversations
- Read Receipts
- Message Attachments

### ✅ Communities
- Create Communities
- Join/Leave Communities
- Community Management
- Moderator System

### ✅ Notifications
- Real-time Notifications
- Mark as Read
- Delete Notifications

### ✅ AI/NEX Assistant
- Generate Posts
- Generate Captions
- Translate Content
- Summarize Content
- Content Moderation
- Spam Detection

### ✅ Admin Dashboard
- User Management
- Content Moderation
- Reports Management
- Analytics Dashboard
- Security Monitoring

---

## 📚 API Endpoints

### Auth
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh-token` - Refresh Token

### Users
- `GET /api/users/:id` - Get Profile
- `GET /api/users/followers` - Get Followers
- `POST /api/users/:id/follow` - Follow User

### Posts
- `POST /api/posts/create` - Create Post
- `GET /api/posts/feed` - Get Feed
- `POST /api/posts/:id/like` - Like Post
- `GET /api/posts/explore/trending` - Trending Posts

### Messages
- `POST /api/messages/send` - Send Message
- `GET /api/messages/conversations` - Get Conversations

### Communities
- `POST /api/communities/create` - Create Community
- `GET /api/communities` - List Communities
- `POST /api/communities/:id/join` - Join Community

### AI
- `POST /api/ai/generate-post` - Generate Post
- `POST /api/ai/nex/chat` - Chat with NEX

### Admin
- `GET /api/admin/users` - List Users
- `GET /api/admin/reports` - Get Reports
- `GET /api/admin/analytics/dashboard` - Dashboard

---

## 🛠 Development

### Backend Development

```bash
cd backend
npm run start:dev    # Development mode with auto-reload
npm run lint         # Lint code
npm run test         # Run tests
npm run build        # Build for production
```

### Frontend Development

```bash
cd frontend
npm run dev          # Development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Lint code
```

---

## 🐳 Docker Deployment

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

---

## 📊 Database

NEXORA uses PostgreSQL with the following main tables:

- `users` - User accounts
- `profiles` - User profiles
- `posts` - Posts
- `likes` - Post likes
- `comments` - Post comments
- `followers` - Follow relationships
- `messages` - Direct messages
- `communities` - Community groups
- `notifications` - User notifications

---

## 🔐 Security

- Password hashing with bcrypt
- JWT authentication
- 2FA support
- CORS protection
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection

---

## 🤝 Contributing

1. Create a new branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a Pull Request

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🌟 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ by Darkman**
