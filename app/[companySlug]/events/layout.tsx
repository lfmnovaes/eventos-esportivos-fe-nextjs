import Footer from '@/app/ui/footer';
import Navbar from '@/app/ui/navbar';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Navbar solidBackground />
      <main className="flex flex-col min-h-screen w-full bg-white text-black">{children}</main>
      <Footer />
    </>
  );
}
