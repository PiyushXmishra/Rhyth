export interface User {
    id: number;
    username: string;
    email: string;
    password: string; // Store hashed passwords!
}