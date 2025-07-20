# 🍔 QuickBite – MERN Stack Food Ordering Application

QuickBite is a modern food ordering platform built with the **MERN stack** (MongoDB, Express, React, Node.js). It offers users a seamless and secure experience for browsing, ordering, and managing meals, complete with a responsive UI and admin dashboard.

## 🔗 Links

- **Live Demo:** https://quickbite-mern-stack.netlify.app/
- **Source Code:** [GitHub Repository](https://github.com/ReynoldArun09/mern-quickbite)

## 🌟 Features

- **Responsive Design:**

  - Built with Tailwind CSS and Shadcn UI for a modern and responsive user interface.

- **State Management:**

  - Data fetching and state management using Tanstack Query for a smooth user experience.

- **Form Handling:**

  - Form validation and management with React Hook Form and Zod.

- **Testing:**

  - Unit test with Jest and supertest for the server-side.
  - Api testing with vitest and mock service worker

- **Containerization:**

  - Entire application is containerized using Docker for easy development.

- **SEO:**

  - Basic SEO with react-helmet-async

- **security features**
  - CORS configuration
  - Rate limiting
  - Input validations
  - Helmet
  - Error Handling

## 🛠️ Technologies Used

### 🚀 Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- Axios
- React Hook Form
- Zod
- TanStack Query
- Vitest
- Mock Service Worker

### 🔧 Backend

- Node.js
- Express
- MongoDB (Mongoose)
- TypeScript
- Resend (Email service)
- Winston (Logging)
- Jest
- Supertest
- BullMQ (Job queue)

### 🐳 DevOps & Tooling

- Docker
- Docker Compose
- Git
- PNPM

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v18+)
- MongoDB
- Redis
- Docker (optional)
- Git
- Cloudinary account

### Local Development Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ReynoldArun09/mern-quickbite
   cd mern-quickbite
   ```

2. **Environment Configuration**

   Create `.env` files in both frontend and backend directories:

   **Backend (.env)**

   ```env
   NODE_ENV=development
   PORT=3000
   CORS_ORIGIN=http://localhost:5173
   MONGO_DB_URI=mongodb://mongo:27017/quickbite (for docker)
   MONGO_DB_URI=mongodb://localhost:27017/quickbite
   ACCESS_SECRET_KEY=secret
   SALT=
   STRIPE_KEY=
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   REDIS_URL=
   RESEND_API_KEY=
   ```

   **Frontend (.env)**

   ```env
   VITE_BACKEND_URL = http://localhost:3000/api/v1/
   VITE_ENV = development
   VITE_STRIPE_KEY = YOUR_STRIPE_KEY
   ```

3. **Install Dependencies**

   ```bash
   # Install backend dependencies
   cd backend
   pnpm install

   # Install frontend dependencies
   cd ../frontend
   pnpm install
   ```

4. **Start Development Servers**

   **Backend**

   ```bash
   cd backend
   pnpm run dev
   ```

   **Frontend (new terminal)**

   ```bash
   cd frontend
   pnpm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

### Docker Setup

1. **Build and Run Containers**

   ```bash
   docker-compose up --build
   ```

2. **Stop Containers**
   ```bash
   docker-compose down
   ```

## 🧪 Testing

```bash
# Run backend tests
cd backend
pnpm run test
```

```bash
# Run frontend tests
cd frontend
pnpm run test
or
pnpm run test-ui
```
