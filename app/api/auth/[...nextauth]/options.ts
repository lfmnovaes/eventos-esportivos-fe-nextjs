import type {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'text', placeholder: 'username@mail.com'},
        password: {label: 'Password', type: 'password'}
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/auth/jwt`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        }

        return null;
      }
    })
  ]
};
