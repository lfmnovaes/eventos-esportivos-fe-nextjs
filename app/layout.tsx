import type {Metadata} from 'next';
import './globals.css';
import {space_grotesk} from '@/app/ui/fonts';
import Providers from '@/app/providers';

export const metadata: Metadata = {
  title: 'Eventos Esportivos',
  description: 'Powered by Plathanus'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={space_grotesk.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
