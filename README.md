
# Rhyth 🎵🎥  

**Rhyth** is a music platform built as a passion project, designed to enhance the way we enjoy music by combining audio and video. Unlike traditional platforms, **Rhyth** lets users watch music videos alongside organizing their favorite tracks into playlists.  

## Features  

- 🔍 **Search Songs**: Quickly search for songs and fetch 10–20 curated results.  
- 🎥 **Watch Music Videos**: Play songs with integrated video through an embedded YouTube player.  
- 📋 **Create Playlists**: Organize favorite tracks and revisit them anytime.  
- 🌐 **User-Friendly Interface**: Built with modern UI/UX practices for a seamless experience.  

## Tech Stack  

- **Frontend**: [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/)  
- **Backend**: Node.js with Express, [Prisma](https://www.prisma.io/) ORM  
- **Database**: PostgreSQL  
- **External APIs**: YouTube API for fetching song and video data  

## Installation  

### Prerequisites  
- [Node.js](https://nodejs.org/) (v16 or higher)  
- [PostgreSQL](https://www.postgresql.org/)  

### Steps  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/username/rhyth.git  
   cd rhyth  
   ```  

2. Install dependencies:  
   ```bash  
   npm install  
   ```  

3. Set up environment variables:  
   Create a `.env` file in the root directory with the following variables:  
   ```plaintext  
   DATABASE_URL=your_postgresql_connection_string  
   YOUTUBE_API_KEY=your_youtube_api_key  
   ```  

4. Run database migrations:  
   ```bash  
   npx prisma migrate dev  
   ```  

5. Start the development server:  
   ```bash  
   npm run dev  
   ```  

## Usage  

1. Open the application at `http://localhost:3000`.  
2. Search for songs to find their videos.  
3. Create playlists to organize your favorite tracks and videos.  

## Future Goals  

- Add a recommendation system for related videos.  
- Enable playlist sharing and collaboration.  
- Optimize performance for high-quality video playback.  

## Contributing  

Contributions are welcome! Please:  
1. Fork the repository.  
2. Create a new branch: `git checkout -b feature-name`.  
3. Commit your changes: `git commit -m "Add a new feature"`.  
4. Push to the branch: `git push origin feature-name`.  
5. Open a pull request for review.  

## License  

This project is open-source and available under the [MIT License](LICENSE).  
