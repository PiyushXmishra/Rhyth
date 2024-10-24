"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // Seed Users
    const user1 = yield prisma.user.create({
        data: {
            username: 'userone',
            email: 'user1@example.com',
            password: yield bcrypt_1.default.hash('password1', 10), // Hash the password
        },
    });
    const user2 = yield prisma.user.create({
        data: {
            username: 'usertwo',
            email: 'user2@example.com',
            password: yield bcrypt_1.default.hash('password2', 10),
        },
    });
    // Seed Playlists without Songs
    yield prisma.playlist.createMany({
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
});
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
