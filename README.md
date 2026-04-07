# Digital Document Verification System (MERN)

A secure, modern portal for document verification using Node.js, React, and Cloudinary.

## Features
- **JWT Authentication**: Secure login/register with role-based access.
- **Glassmorphism UI**: Beautiful, interactive design with dark mode and animations.
- **File Upload**: Securely upload PDF/Image to Cloudinary.
- **Admin Dashboard**: Verification queue for approving/rejecting documents.
- **Real-time Updates**: Status badges and toast notifications.

---

## Part 1: Backend Setup (Node.js + Express + MongoDB)

1. Navigate to `/backend`
2. Install dependencies: `npm install`
3. Create `.env` and configure:
   - `MONGODB_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: Random complex string.
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: From your Cloudinary dashboard.
4. Run server: `npm run start` or `node index.js`

---

## Part 2: Frontend Setup (React + Vite + Tailwind)

1. Navigate to `/frontend`
2. Install dependencies: `npm install`
3. Configure API URL in `src/services/api.service.js` if necessary.
4. Run app: `npm run dev`

---

## Folder Structure

### Backend
- `/controllers`: API business logic.
- `/models`: Mongoose schemas.
- `/routes`: Endpoint definitions.
- `/middleware`: Auth & role filters.
- `/config`: Third-party services (Cloudinary).

### Frontend
- `/context`: Global state (AuthContext).
- `/pages`: View components for Admin/User.
- `/components`: Reusable UI elements (StatusBadge, Navbar).
- `/services`: Axios API client.
