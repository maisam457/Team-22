import NextAuth from 'next-auth';
import LinkedInProvider from 'next-auth/providers/linkedin';

export default NextAuth({
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID || '',
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
      authorization: {
        params: { scope: 'r_liteprofile r_emailaddress' }
      }
    })
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Add LinkedIn profile info to session
      session.user.id = token.sub;
      session.user.image = token.picture;
      session.user.name = token.name;
      return session;
    }
  }
});
