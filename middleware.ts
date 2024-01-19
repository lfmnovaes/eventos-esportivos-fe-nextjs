export {default} from 'next-auth/middleware';

// Ref: https://nextjs.org/docs/pages/building-your-application/routing/middleware

export const config = {
  matcher: ['/dashboard']
};
