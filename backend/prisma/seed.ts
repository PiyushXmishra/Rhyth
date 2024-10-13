import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
  // Seed Users
  const user1 = await prisma.user.create({
    data: {
      username: 'userone',
      email: 'user1@example.com',
      password: await bcrypt.hash('password1', 10), // Hash the password
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'usertwo',
      email: 'user2@example.com',
      password: await bcrypt.hash('password2', 10),
    },
  });

  // Seed Playlists without Songs
  await prisma.playlist.createMany({
    data: [
      {
        name: 'Chill Vibes',
        userId: user1.id, // Reference to User One
      },
      {
        name: 'Party Hits',
        userId: user1.id, // Reference to User One
      },
      {
        name: 'Favorites',
        userId: user2.id, // Reference to User Two
      },
      {
        name: 'Workout Playlist',
        userId: user2.id, // Reference to User Two
      },
    ],
  });

  console.log('Seeded users and playlists');
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
