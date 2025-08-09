# Narrative Niche

A fullstack MERN blog platform that allows users to create, read, update, and comment on blogs. Designed for learning, portfolio, and placement demonstration purposes.

## Features
- User authentication (signup/login)
- Create, edit, and delete blogs
- Comment on blogs
- Responsive UI with modern design
- Admin dashboard for blog management
- Search and filter blogs

## Folder Structure
```
├── backend/         # Express.js API, MongoDB models, controllers, routes
├── frontend/        # React app, components, pages, assets
├── package.json     # Root dependencies
├── .gitignore       # Git ignore rules
└── README.md        # Project documentation
```

## Technologies Used
- **Frontend:** React, Vite, Tailwind CSS, Redux
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Other:** JWT Auth, Cloudinary (for images), ESLint

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Backend Setup
```bash
cd backend
npm install
# Create a .env file with your MongoDB URI and JWT secret
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables
- `backend/.env` should include:
  - `MONGODB_URI=your_mongodb_connection_string`
  - `JWT_SECRET=your_jwt_secret`
  - `CLOUDINARY_URL=your_cloudinary_url` (if using image uploads)
- `frontend/.env` (optional for API base URL)

## Contribution Guidelines
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your branch and open a Pull Request
