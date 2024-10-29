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
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        domain: 'rhyth.vercel.app',  
        httpOnly: true,
        secure: true,
      },
    },
  }
};
export const handler = NextAuth(options);

export { handler as GET, handler as POST };
