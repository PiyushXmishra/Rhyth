import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const options: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt", // TypeScript now understands this as a valid strategy
  },
};

export const handler = NextAuth(options);

export { handler as GET, handler as POST };
