# Environment Setup Guide

This project uses separate `.env` files for frontend and backend configuration.

## Frontend Setup

1. Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

**Or for production:**
```env
VITE_API_URL=https://your-api-domain.com/api
```

## Backend Setup

1. Create a `.env` file in the `backend/` directory:

```env
PORT=5000
NODE_ENV=development

# Frontend Configuration
FRONTEND_URL=http://localhost:5173

# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/docsure?appName=Cluster0

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_12345

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USERNAME=your_username
EMAIL_PASSWORD=your_password
EMAIL_FROM=noreply@docverify.com
```

## Running the Application

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Environment Variables

### Frontend (VITE_API_URL)
- **Development**: `http://localhost:5000/api`
- **Production**: Your deployed backend URL

### Backend (FRONTEND_URL)
- **Development**: `http://localhost:5173`
- **Production**: Your deployed frontend URL

These are used for CORS configuration to allow cross-origin requests.

## Notes

- `.env` files are **NOT** committed to git (see `.gitignore`)
- Use `.env.example` as a template
- Never commit sensitive credentials
- For production, use environment variables from your hosting platform (Vercel, Heroku, etc.)
