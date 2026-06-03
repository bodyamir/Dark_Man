# 🏗️ NEXORA - System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                               │
├─────────────────────────────────────────────────────────────────┤
│  Web (Next.js/React)  │  Mobile (Flutter)  │  Desktop (Electron)│
└────────────────┬──────────────────────────────────────────┬─────┘
                 │                                          │
                 │         WebSocket / REST API              │
                 │                                          │
┌────────────────▼────────────────────────────────────────▼─────┐
│                    API GATEWAY LAYER                           │
├──────────────────────────────────────────────────────────────┤
│  Load Balancer  │  Rate Limiting  │  CORS  │  Request Router  │
└────────────────┬───────────────────────────────────────────┬──┘
                 │                                          │
┌────────────────▼────────────────────────────────────────▼──┐
│              MICROSERVICES / MODULES (NestJS)            │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   AUTH       │  │   USERS      │  │   POSTS      │   │
│  │ MODULE       │  │   MODULE     │  │   MODULE     │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  MESSAGING   │  │ COMMUNITIES  │  │ NOTIF.       │   │
│  │  MODULE      │  │   MODULE     │  │   MODULE     │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   AI/NEX     │  │  SECURITY    │  │   ADMIN      │   │
│  │  MODULE      │  │   MODULE     │  │   MODULE     │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                           │
│  ┌──────────────┐  ┌──────────────┐                      │
│  │  ANALYTICS   │  │  MODERATION  │                      │
│  │  MODULE      │  │   MODULE     │                      │
│  └──────────────┘  └──────────────┘                      │
└────────────┬────────────────────────────────────────────┬──┘
             │                                            │
┌────────────▼────────────────────────────────────────────▼──┐
│           PERSISTENCE & CACHE LAYER                        │
├───────────────────────────────────────────────────────────┤
│  PostgreSQL Database  │  Redis Cache  │  S3 Storage       │
└───────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication Flow

```
User Login Request
        ↓
Validate Credentials
        ↓
Check 2FA Status
        ↓
Generate JWT Token + Refresh Token
        ↓
Return Access Token (15 min expiry)
        ↓
Store Refresh Token (7 days expiry)
        ↓
Client sends JWT in Authorization header for API calls
```

---

## 📊 Data Flow Architecture

### Post Creation Flow
```
User Creates Post
        ↓
Validate Content (Security Module)
        ↓
Store in PostgreSQL
        ↓
Cache in Redis
        ↓
Index for Search
        ↓
Upload Media to S3
        ↓
Broadcast via WebSocket
        ↓
Trigger Notifications
        ↓
Update Analytics
```

---

**Production-ready architecture for millions of users**
