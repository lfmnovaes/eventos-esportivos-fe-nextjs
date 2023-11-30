import Image from 'next/image';
import Navbar from '@/app/ui/navbar';
import SectionText from './ui/section-text';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between">
        <section className="w-full h-screen relative">
          <Image
            src="/hero-desktop.jpg"
            alt="Hero image"
            fill
            style={{objectFit: 'cover', objectPosition: 'center'}}
          />
        </section>
        <SectionText />
      </main>
    </>
  );
}
