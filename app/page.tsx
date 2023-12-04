import Image from 'next/image';
import Navbar from '@/app/ui/navbar';
//import {SectionText, SectionEvents, SectionCalendar, Footer} from './ui';
import SectionText from '@/app/ui/section-text';
import SectionEvents from '@/app/ui/section-events';
import SectionCalendar from '@/app/ui/section-calendar';
import Footer from '@/app/ui/footer';

export default function Home() {
  return (
    <>
      <Navbar title={<Image  src="/logo.png" alt="logo" width={235} height={53} />} />
      <main className="flex min-h-screen flex-col items-center justify-between leading-5">
        <section className="w-full h-screen relative">
          <Image
            src="/hero-desktop.jpg"
            alt="Hero image"
            fill
            style={{objectFit: 'cover', objectPosition: 'center'}}
            priority
          />
        </section>
        <SectionText />
        <SectionEvents />
        <SectionCalendar />
      </main>
      <Footer />
    </>
  );
}
