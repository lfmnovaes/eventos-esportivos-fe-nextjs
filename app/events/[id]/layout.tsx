import Footer from '@/app/ui/footer';
import Navbar from '@/app/ui/navbar';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Navbar solidBackground />
      <main className="flex flex-col md:flex-row md:overflow-hidden bg-white text-black">
        {children}
      </main>
      <Footer />
    </>
  );
}
