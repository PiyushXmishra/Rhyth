# Rhyth 🎵

**Rhyth** is a music platform built as a passion project, designed to enhance the way we enjoy music. Unlike traditional platforms, **Rhyth** lets users watch music videos alongside organizing their favorite tracks into playlists, with robust caching for optimal performance.

## Features

- 🔍 **Search Songs**: Quickly search for songs and fetch curated results from YouTube
- 🎥 **Watch Music Videos**: Play songs with integrated video through an embedded YouTube player
- 📋 **Create & Manage Playlists**: Create, organize and manage personal playlists
- 🚀 **Performance Optimized**: Redis caching implementation for faster data retrieval
- 🔒 **Secure Authentication**: JWT-based user authentication system
- 🌐 **Responsive Design**: Modern UI/UX built for seamless experience across devices

## Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) - React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Static typing for JavaScript

### Backend
- Node.js with Express - Server framework
- [Prisma](https://www.prisma.io/) - Modern database ORM
- [TypeScript](https://www.typescriptlang.org/) - Type safety for backend
- Redis - For caching and performance optimization
- PostgreSQL - Primary database

### APIs & Authentication
- YouTube Data API v3 - For video metadata
- JWT (JSON Web Tokens) - Secure authentication

## Installation

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL
- Redis

### Setup Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/PiyushXmishra/rhyth
   cd rhyth
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Configure environment variables:
   Create `.env` files in both frontend and backend directories:

   Backend `.env`:
   ```plaintext
   DATABASE_URL="postgresql://user:password@localhost:5432/rhyth"
   REDIS_URL="redis://localhost:6379"
   JWT_SECRET="your-jwt-secret"
   YOUTUBE_API_KEY="your-youtube-api-key"
   ```

   Frontend `.env`:
   ```plaintext
   NEXT_PUBLIC_API_URL="http://localhost:3001"
   ```

4. Set up the database:
   ```bash
   cd backend
   npx prisma migrate dev
   ```

5. Start the development servers:
   ```bash
   # Start backend server (from backend directory)
   npm run dev

   # Start frontend server (from frontend directory)
   npm run dev
   ```

## Usage

1. Access the application at `http://localhost:3000`
2. Create an account or log in
3. Search for songs using the search bar
4. Create playlists and add your favorite songs
5. Enjoy music videos with playlist management capabilities

## Key Features in Development

- 🎮 **Music Rooms**: Collaborative spaces for users to queue and prioritize songs
- 🎯 **Smart Recommendations**: AI-powered song suggestions based on listening history
- 🎨 **Drag & Drop Interface**: Implementation of dnd-kit for intuitive playlist management
- 📱 **Mobile App**: Native mobile application development planned

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and conventions
- Add appropriate comments and documentation
- Write tests for new features
- Update README.md with any necessary changes

## Acknowledgments

- Thanks to all contributors who have helped shape Rhyth
- Special thanks to the open-source community for the amazing tools and libraries
